import { useState } from 'react';

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert("Något gick fel. Försök igen!");
            }
        } catch (error) {
            console.error("Fel vid inskick:", error);
        }
    };

    return (
        <main className="cv-page no-copy">
            <div className="cv-header" style={{ marginBottom: '40px' }}>
                <h1 style={{ borderBottom: 'none', marginBottom: 0 }}>Kontakta Mig</h1>
                {/* Linjen under rubriken */}
                <hr style={{ borderTop: '1px solid var(--color-sage)', opacity: 0.5, marginTop: '10px' }} />
            </div>

            <div className="cv-grid">
                <div className="cv-main-col">
                    {isSubmitted ? (
                        <div>
                            <h3>Tack för ditt meddelande!</h3>
                            <p>Jag återkommer så snart jag kan.</p>
                        </div>
                    ) : (
                        <form id="contact-form" action="https://formspree.io/f/meelvqvg" method="POST" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" style={{ color: 'var(--color-slate)', fontWeight: 'bold' }}>Namn</label>
                                <input type="text" id="name" name="name" placeholder="Ditt namn" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname" style={{ color: 'var(--color-slate)', fontWeight: 'bold' }}>Efternamn</label>
                                <input type="text" id="surname" name="surname" placeholder="Ditt efternamn" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" style={{ color: 'var(--color-slate)', fontWeight: 'bold' }}>Din email*</label>
                                <input type="email" id="email" name="email" placeholder="Din email adress" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" style={{ color: 'var(--color-slate)', fontWeight: 'bold' }}>Meddelande*</label>
                                <textarea id="message" name="message" rows="5" placeholder="Ditt meddelande" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn" style={{ marginTop: '10px' }}>SKICKA</button>
                        </form>
                    )}
                </div>

                <div className="cv-side-col">
                    <h2 style={{ marginTop: 0, textTransform: 'none', borderBottom: 'none', fontSize: '1.8rem', color: 'var(--color-slate)' }}>Information</h2>
                    <p style={{ fontSize: '1.05rem', color: 'var(--color-charcoal)', lineHeight: '1.6' }}>
                        Oavsett om du har specifika frågor, bär på en spännande projektidé eller vill utforska ett framtida samarbete så lyssnar jag gärna. Använd formuläret här intill, så återkommer jag till dig så snart jag kan.
                    </p>
                </div>
            </div>
        </main>
    );
}