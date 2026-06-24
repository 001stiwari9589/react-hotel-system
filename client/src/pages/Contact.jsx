import {useState} from 'react'

const Contact = () => {
      const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
  
        e.preventDefault();

        const formdata = { name, email,message,}

        localStorage.setItem("contactFormData", JSON.stringify(formdata));
        alert("Message sent successfully!");

        setName("");
        setEmail("");
        setMessage("");

    }

  return (
   <div className="container mt-5">

      <h1 className="text-danger text-center mb-4">
        Contact Us
      </h1>

      <div className="row">

        {/* Contact Details */}
        <div className="col-md-5 mb-4">
          <div className="card shadow p-4 h-100">

            <h3 className="text-primary mb-3">
              Contact Details
            </h3>

            <p>
              <strong>Name:</strong> Satyam Tiwari
            </p>

            <p>
              <strong>Website:</strong> Smart Hotel
            </p>

            <p>
              <strong>Phone:</strong> +91 9589018011
            </p>

            <p>
              <strong>Email:</strong> satyam@example.com
            </p>

            <p>
              <strong>City:</strong> Bhopal
            </p>

            <p>
              <strong>Location:</strong> Madhya Pradesh, India
            </p>

          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <form
            className="card p-4 shadow"
            onSubmit={handleSubmit}
          >
            <h3 className="mb-3">
              Send Message
            </h3>

            <input
              type="text"
              placeholder="Enter Name"
              className="form-control mb-3"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Enter Email"
              className="form-control mb-3"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <textarea
              placeholder="Enter Message"
              className="form-control mb-3"
              rows="5"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            ></textarea>

            <button className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact
