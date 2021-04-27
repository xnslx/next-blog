import {useState, useEffect} from 'react';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers:{
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Something went wrong!') 
    }
}

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('')
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState()

    useEffect(() => {
        if(requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null)
            }, 3000)

            return () => clearTimeout(timer)
        }
    },[requestStatus])

    async function sendMessageHandler(e) {
        e.preventDefault();

        setRequestStatus('pending')

        try{
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            })    
            setRequestStatus('success')
            setEnteredMessage('')
            setEnteredEmail('')
            setEnteredName('')
        } catch(error) {
            setRequestError(error.message)
            setRequestStatus('error')
        }
    }

    let notification;

    if(requestStatus === 'pending') {
        notification = {
            status:'pending',
            title: 'Sending message!',
            message:'Your message is on the way!'
        }
    }
    if(requestStatus === 'success') {
        notification = {
            status:'success',
            title: 'Success!',
            message:'Message sent successfully!'
        }
    }

    if(requestStatus === 'error') {
        notification = {
            status:'error',
            title:'Error',
            message: requestError,
        }
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
            {notification && <Notification 
                status={notification.status} 
                title={notification.title} 
                message={notification.message}

            />}
        </section>
    )
};

export default ContactForm;