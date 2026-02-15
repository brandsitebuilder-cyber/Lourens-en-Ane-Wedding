import React, { useState } from 'react';
import { RsvpData } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RsvpData>({
    name: '',
    email: '',
    attending: true,
    guests: 1,
    dietaryRestrictions: '',
    songRequest: '',
    plusOneName: '',
    plusOneDietary: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data mapping for Google Sheet
    // We combine Plus One details into existing fields to match the specific headers requested
    const submissionName = formData.guests > 1 && formData.plusOneName 
      ? `${formData.name} & ${formData.plusOneName}`
      : formData.name;

    const submissionDietary = formData.guests > 1 && formData.plusOneDietary
      ? `${formData.dietaryRestrictions ? formData.dietaryRestrictions + '. ' : ''}Plus One: ${formData.plusOneDietary}`
      : formData.dietaryRestrictions;

    const payload = {
      fullName: submissionName,
      email: formData.email,
      status: formData.attending ? 'Joyfully Accepts' : 'Regretfully Declines',
      guests: formData.guests,
      songRequest: formData.songRequest,
      dietaryRestrictions: submissionDietary
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyUpd7-ku4gQwdKcj8c6kSE9zX88GboD6Fk5dYR_ZcFq_cDmANsWI3pTKdYtqHqY9HH0g/exec', {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script Web Apps to avoid CORS errors
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      // In a real app, you might want to show an error message to the user here
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all">
      <div className="bg-wedding-cream w-full max-w-lg p-8 rounded-sm shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-wedding-oliveDark hover:text-black font-sans text-xl"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h2 className="text-3xl font-serif text-wedding-oliveDark mb-2">Join Us</h2>
            <p className="text-sm font-sans text-gray-600 mb-6 uppercase tracking-wider">Please respond by September 1st</p>
            
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="attending" 
                    checked={formData.attending}
                    onChange={() => setFormData({...formData, attending: true})}
                    className="accent-wedding-olive"
                  />
                  <span className="text-wedding-oliveDark">Joyfully Accepts</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="attending" 
                    checked={!formData.attending}
                    onChange={() => setFormData({...formData, attending: false})}
                    className="accent-wedding-olive"
                  />
                  <span className="text-wedding-oliveDark">Regretfully Declines</span>
                </label>
              </div>

              {formData.attending && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Total Guests</label>
                        <select 
                        className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive"
                        value={formData.guests}
                        onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                        >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? '(Just Me)' : ''}</option>
                        ))}
                        </select>
                    </div>
                  </div>

                  {formData.guests > 1 && (
                    <div className="bg-white/50 p-4 border border-wedding-olive/20 mt-2">
                       <h4 className="font-serif text-lg text-wedding-oliveDark mb-3">Plus One Details</h4>
                       <div className="space-y-3">
                         <div>
                           <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Guest Name(s)</label>
                           <input
                             type="text"
                             required={formData.guests > 1}
                             placeholder="Full name of your plus one"
                             className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive"
                             value={formData.plusOneName || ''}
                             onChange={e => setFormData({...formData, plusOneName: e.target.value})}
                           />
                         </div>
                         <div>
                           <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Guest Dietary Restrictions</label>
                           <input
                             type="text"
                             placeholder="Any allergies or preferences?"
                             className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive"
                             value={formData.plusOneDietary || ''}
                             onChange={e => setFormData({...formData, plusOneDietary: e.target.value})}
                           />
                         </div>
                       </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">I promise to dance if you play...</label>
                    <input 
                      type="text"
                      placeholder="Song Title - Artist"
                      className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive"
                      value={formData.songRequest || ''}
                      onChange={e => setFormData({...formData, songRequest: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Your Dietary Restrictions</label>
                    <textarea 
                      className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive h-20"
                      value={formData.dietaryRestrictions}
                      onChange={e => setFormData({...formData, dietaryRestrictions: e.target.value})}
                    />
                  </div>
                </>
              )}

              <button 
                type="submit"
                className="w-full bg-wedding-olive text-white py-4 mt-4 uppercase tracking-[0.2em] text-sm hover:bg-wedding-oliveDark transition-colors"
              >
                Send RSVP
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-3xl font-serif text-wedding-olive mb-4">Thank You!</h3>
            <p className="font-sans text-gray-600 mb-8">We have received your response.</p>
            <button 
              onClick={onClose}
              className="text-xs uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-wedding-olive hover:border-wedding-olive transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};