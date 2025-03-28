import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonRouterLink } from "@ionic/react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle className="logo">
          <IonRouterLink href="/" className="nav-link">JobPortal</IonRouterLink>
        </IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonRouterLink href="/" className="nav-link">Home</IonRouterLink>
          </IonButton>
          <IonButton>
            <IonRouterLink href="/about" className="nav-link">About</IonRouterLink>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
