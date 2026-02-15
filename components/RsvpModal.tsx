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
    dietaryRestrictions: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all">
      <div className="bg-wedding-cream w-full max-w-lg p-8 rounded-sm shadow-2xl relative">
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
                  <div>
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Number of Guests</label>
                    <select 
                      className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive"
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Dietary Restrictions</label>
                    <textarea 
                      className="w-full bg-white border border-gray-300 p-3 text-wedding-oliveDark focus:outline-none focus:border-wedding-olive h-24"
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