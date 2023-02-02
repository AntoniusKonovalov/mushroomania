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
        There are two options for a user to register and login to the website, using the registration form of the website, or using Google OAuth Access. After a registration and verifying Google token, or a password if the user exists on the back end. JWT generated and assigned to a user for a period. The token include user information for a verification and personal purchase history on a "Cart" page. 
      </p>
      <p>
        There also an option of edit the product page by providing a user "Admin" permission which would be given by entering Admin credentials of a Log-in section. 
      </p>
      
    </div> 
  )
}

export default Text
