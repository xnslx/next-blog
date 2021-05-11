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
        <section className="ml-auto mr-auto w-4/5 mt-20 md:w-7/12">
            <h1 className="text-center font-bold text-2xl">How can I help you?</h1>
            <form onSubmit={sendMessageHandler} className="flex-col md:w-full h-2/3 mt-8 ">
                <div>
                    <label htmlFor="email" className="text-sm font-normal">Your Email</label>
                    <input 
                    type="email" 
                    id="email" 
                    required 
                    value={enteredEmail}
                    onChange={e => setEnteredEmail(e.target.value)}
                    className="block h-10 w-full mb-2  rounded border-black border-2"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="text-sm font-normal">Your Name</label>
                    <input 
                    type="text" 
                    id="name" 
                    required
                    value={enteredName}
                    onChange={e => setEnteredName(e.target.value)}
                    className="block h-10 w-full mb-2 rounded border-black border-2"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="text-sm font-normal">Your Message</label>
                    <textarea 
                        id="message"  
                        rows="5"
                        required
                        value={enteredMessage}
                        onChange={e => setEnteredMessage(e.target.value)}
                        className="w-full rounded border-black border-2 mb-8"
                        >
                    </textarea>
                </div>
                <div>
                    <button className="h-10 w-full bg-gray-800 mb-2 text-xs text-white rounded mr-1">Send Message</button>
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