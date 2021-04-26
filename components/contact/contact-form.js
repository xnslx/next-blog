import {useState} from 'react';

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('')
    const [enteredMessage, setEnteredMessage] = useState('');

    function sendMessageHandler(e) {
        e.preventDefault();

        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            }),
            headers:{
                'Content-Type': 'application/json',
            }
        })
    }
    return (
        <section>
            <h1>How can I help you?</h1>
            <form onSubmit={sendMessageHandler}>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input 
                    type="email" 
                    id="email" 
                    required 
                    value={enteredEmail}
                    onChange={e => setEnteredEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="name">Your Name</label>
                    <input 
                    type="text" 
                    id="name" 
                    required
                    value={enteredName}
                    onChange={e => setEnteredName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="message">Your Message</label>
                    <textarea 
                        id="message"  
                        rows="5"
                        required
                        value={enteredMessage}
                        onChange={e => setEnteredMessage(e.target.value)}>
                    </textarea>
                </div>
                <div>
                    <button>Send Message</button>
                </div>
            </form>
        </section>
    )
};

export default ContactForm;