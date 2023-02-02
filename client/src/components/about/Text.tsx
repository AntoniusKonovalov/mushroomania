import React from 'react'

const Text = () => {
  return (
    <div>
      <p>
        The development of this website was carried out using a combination of advanced technologies and tools to ensure optimal performance, security, and user experience.
      </p> 
      <p>
        The front-end was developed using the powerful and efficient React and Redux Toolkit framework, while the back-end utilized the reliable and scalable MySQL database.
      </p>
      <p>
        To connect the front and back end, a custom domain was established through the use of Cloudflare DNS service, providing additional security and optimization benefits. The custom domain was secured with HTTPS, further reinforcing the commitment to data privacy and security for all website users.
      </p>
      <p>
        Users can register and log in to the website either through the registration form or via Google OAuth Access. Upon successful registration and verification, either through a password or a verified Google token, an encoded JWT token is generated and assigned to the user for a specified duration. This token contains user information and is used to verify and retrieve personal information from the SQL database. 
      </p>
      <p>
        For users with "Admin" permission, there is the option to edit the product page by entering the required credentials in the log-in section.
      </p>
      
    </div> 
  )
}

export default Text
