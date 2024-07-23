import React, { useState, useEffect } from 'react';
import './Contact.css';
import { useAuth } from '../store/auth';
import TopLoading from '../components/TopLoading';
import { toast } from 'react-toastify';

export default function Contact() {
    const [contactDetails, setContactDetails] = useState({ username: "", email: "", subject: "", message: "" });
    const [userData, setUserData] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.email && !userData) {
            setContactDetails({
                username: user.username,
                email: user.email,
                subject: "",
                message: ""
            });
            setUserData(true);
        }
    }, [user, userData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactDetails)
            });
            if (response.ok) {
                // alert("Message sent successfully");
                toast.success("Message sent successfully")

                setContactDetails({ subject: "", message: "" });
            } else {
                console.log("Error inside response", "error");
            }
        } catch (error) {
            console.log('contact', error);
        }
    };

    const handleChange = (e) => {
        setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
    };

    return (
        <div className="image-about">
            <TopLoading />
            <div className="hodInfo">
                <div className="info">
                    <h1>EduTech</h1>
                    <p>Career & Personality Development Academy</p>
                    <p>NH 66, Srinivasnagar, Surathkal, Mangaluru, Karnataka 575025</p>
                </div>
                <div className="icons">
                    <ul>
                        <a href="https://maps.app.goo.gl/hx2USKQgyrEFJ5jp9"><i className="fa-sharp fa-solid fa-location-dot fa-2xl"></i></a>
                        <p id="india">India</p>
                        <i className="fa-sharp fa-solid fa-phone fa-2xl"></i>
                        <p>7517799265</p>Cont
                        <i className="fa-solid fa-envelope fa-2xl"></i>
                        <p><a href="mailto:hodit@nitk.edu.in">edutech@gmail.com</a></p>
                    </ul>
                </div>
            </div>
            <div className="cont">
                <form onSubmit={handleSubmit}>
                    <h1>Contact Us</h1>
                    <p>Do you have any questions? Please feel free to contact us directly. Our team will come back to you within a matter of hours to help you.</p>
                    <div className="name-email">
                        <div className="name">
                            <p>Name</p>
                            <input type="text" id="name" onChange={handleChange} name="username" value={contactDetails.username} />
                        </div>
                        <div className="name">
                            <p>Email</p>
                            <input type="email" id="email" onChange={handleChange} name="email" value={contactDetails.email} />
                        </div>
                    </div>
                    <div className="sub-msg">
                        <p>Subject</p>
                        <input type="text" id="subject" name="subject" onChange={handleChange} value={contactDetails.subject} />
                        <p>Message</p>
                        <textarea id="message" rows="4" name="message" onChange={handleChange} value={contactDetails.message}></textarea>
                    </div>
                    <div className="but">
                        <button type="submit" id="btn" value="Submit Form">Send</button>
                    </div>
                </form>
            </div>
            <section>
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.199476096298!2d76.75686777481182!3d19.273689681971984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd017d8c3ffb33f%3A0xc341c72334eb66fa!2sSwami%20Vivekanand%20Career%20Academy%2C%20Parbhani!5e0!3m2!1sen!2sin!4v1707210373878!5m2!1sen!2sin" width="2380" height="450" style={{border:0,alignItems:'center',justifyContent:'center'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3906400112855!2d74.794309!3d13.010777599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35211b768ac8f%3A0x6b1144ac2d5dadf3!2sNational%20Institute%20of%20Technology%20Karnataka!5e0!3m2!1sen!2sin!4v1711406961757!5m2!1sen!2sin" width="2380" height="450" style={{border:0,alignItems:'center',justifyContent:'center'}}  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </div>
    );
}
