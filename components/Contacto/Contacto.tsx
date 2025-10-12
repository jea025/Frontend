"use client";
import "./Contacto.css";
import React, { useRef } from "react";
import Image from "next/image";

// Tipos para los datos del formulario
interface FormElements extends HTMLFormControlsCollection {
  user_name: HTMLInputElement;
  user_email: HTMLInputElement;
  message: HTMLTextAreaElement;
}

interface FormElement extends HTMLFormElement {
  elements: FormElements;
}

export default function Contacto() {
  const form = useRef<FormElement>(null); // Especificamos que el formulario será de tipo `FormElement`

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      const { user_name, user_email, message } = form.current.elements;

      console.log("Nombre:", user_name.value);
      console.log("Email:", user_email.value);
      console.log("Mensaje:", message.value);

      // Aquí puedes implementar el envío de correo o manejar los datos del formulario.
    }
  };

  return (
    <div>
      <div className="contactoContainer">
        <div className="formContainer">
          <h2>
            <span>|</span> CONTACTANOS
          </h2>
          <p>
            <span className="font-bold text-white">Conéctate con nosotros mandándonos un mensaje a nuestro Instagram para conocer más nuestra labor. </span>
          </p>
          {/*<form ref={form} onSubmit={sendEmail}>
            <div className="bloqueUno">
              <div className="formSeccion">
                <label>NOMBRE</label>
                <input
                  className="inputForm"
                  type="text"
                  name="user_name"
                  required
                />
              </div>
              <div className="formSeccion">
                <label>EMAIL</label>
                <input
                  className="inputForm"
                  type="email"
                  name="user_email"
                  required
                />
              </div>
            </div>
            <div className="formSeccionMensaje">
              <label>MENSAJE</label>
              <textarea name="message" required />
            </div>
            <input
              className="buttonForm"
              id="send"
              type="submit"
              value="ENVIAR"
            />
          </form>*/}
        </div>
        <div className="infoContainer">
          {/*<h3 className="titulo-redes">Síguenos en nuestras redes sociales</h3>*/}
          <div className="redes-iconos">
            <a
              href="https://www.youtube.com/user/jenaccionmultimedial"
              target="_blank"
              rel="noreferrer"
              className="youtube"
            >
              <Image src="/youtube.svg" alt="youtube" width={24} height={24} />
            </a>
            <a href="https://www.instagram.com/jovenes.enaccion"              
              target="_blank"
              rel="noreferrer"
              className="instagram"
            >
              <Image src="/instagram.svg" alt="instagram" width={24} height={24} />
            </a>
            <a href="https://www.facebook.com/radio.jovenesenaccion"
              target="_blank"
              rel="noreferrer"
              className="facebook"
            >
              <Image src="/facebook.svg" alt="facebook" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
