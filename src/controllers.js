const { Op } = require('sequelize');
const { Contact } = require('./models');

const identifyContact = async (req, res) => {
    const { email, phoneNumber } = req.body;
    if (phoneNumber !== null && !(Number.isInteger(phoneNumber))) {
        return res.status(400).json({ error: 'Phone number must be provided and must be an integer' });
    }
    let contacts = await Contact.findAll({
        where: {
            [Op.or]: [
                { email },
                { phoneNumber }
            ]
        }
    });

    if (contacts.length === 0) {
        const newContact = await Contact.create({
            email,
            phoneNumber,
            linkPrecedence: 'primary'
        });
        return res.json({
            contact: {
                primaryContactId: newContact.id,
                emails: [newContact.email],
                phoneNumbers: [newContact.phoneNumber],
                secondaryContactIds: []
            }
        });
    }

    let primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary');
    if (!primaryContact) {
        primaryContact = contacts[0];
    }

    const secondaryContacts = contacts.filter(contact => contact.linkPrecedence === 'secondary');
    const emails = [...new Set(contacts.map(contact => contact.email).filter(email => email))];
    const phoneNumbers = [...new Set(contacts.map(contact => contact.phoneNumber).filter(phoneNumber => phoneNumber))];
    const secondaryContactIds = secondaryContacts.map(contact => contact.id);

    return res.json({
        contact: {
            primaryContactId: primaryContact.id,
            emails,
            phoneNumbers,
            secondaryContactIds
        }
    });
};

module.exports = { identifyContact };
