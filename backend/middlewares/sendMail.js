const { createTransport } = require("nodemailer")

const sendMail = async(email,subject,text) =>{
    const transport = createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure: true,
        auth:{
            user:process.env.Gmail,
            pass:process.env.Password
        },
        
    });

    await transport.sendMail({
        from:process.env.Gmail,
        to:email,
        subject,
        text
    })
}

module.exports = sendMail