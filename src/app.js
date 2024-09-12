const express = require('express');
const path = require('path');
const app = express();
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const transporter = require('./utils/transporter');
const cors = require('cors');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.get('/api/greet', (req, res) => {
    res.send(<h1>Hola</h1>)
})

app.post('/api/recaptcha', async(req, res) => {
    const { token } = req.body;

    const params = new URLSearchParams({
        secret: '6Lfx4jUqAAAAAE6BW0DprEy_G5reXkbef6E2zeMo',
        response: token,
    });

    try {
        const response = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            }
        );
        const data = await response.json();
        res.status(200).send(data).end();
    } catch (error) {
        logger.error(error);
        res.status(500).send(error).end();
    }

})

app.post('/api/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        replyTo: email,
        to: 'neniruano@gmail.com',
        subject: `Correo electrónico de ${name}, dirección ${email}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error(error);
            return res.status(500).send('Error al enviar el correo');
        }
        res.status(200).send('Correo enviado correctamente');
    });
});

app.use(middleware.unknownEndpoint);

module.exports = app;
