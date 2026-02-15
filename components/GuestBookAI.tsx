import React, { useState } from 'react';
import { generateWeddingWish } from '../services/geminiService';
import { MessageTone } from '../types';

export const GuestBookAI: React.FC = () => {
  const [relationship, setRelationship] = useState('');
  const [tone, setTone] = useState<MessageTone>(MessageTone.HEARTFELT);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [entries, setEntries] = useState<{name: string, message: string}[]>([
    { name: "Aunt Sarah", message: "Wishing you both a lifetime of love and joy. So happy for you!" },
  ]);

  const handleGenerate = async () => {
    if (!relationship) return;
    setIsLoading(true);
    try {
      const wish = await generateWeddingWish(relationship, tone, "Lourens and Ané");
      setGeneratedMessage(wish);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSign = () => {
    if (guestName && generatedMessage) {
      setEntries([{ name: guestName, message: generatedMessage }, ...entries]);
      setGeneratedMessage('');
      setGuestName('');
      setRelationship('');
    }
  };

  return (
    <section id="guestbook" className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Left: Input */}
        <div>
          <p className="text-wedding-olive text-xs uppercase tracking-[0.2em] mb-4">Leave a Note</p>
          <h2 className="font-serif text-4xl text-wedding-oliveDark mb-6">Digital Guestbook</h2>
          <p className="font-sans text-gray-500 mb-8 leading-relaxed">
            Stuck on what to say? Let our AI assistant help you craft the perfect message for our special day.
          </p>

          <div className="space-y-6 font-sans">
            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-500 mb-2">I am the couple's...</label>
              <input
                type="text"
                placeholder="e.g. Best Friend, Cousin, Colleague"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-olive transition-colors"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-500 mb-2">Message Tone</label>
              <div className="flex flex-wrap gap-2">
                {Object.values(MessageTone).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full border transition-all
                      ${tone === t 
                        ? 'bg-wedding-olive text-white border-wedding-olive' 
                        : 'bg-transparent text-gray-500 border-gray-200 hover:border-wedding-olive'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!relationship || isLoading}
              className="w-full py-3 border border-wedding-olive text-wedding-olive uppercase tracking-[0.2em] text-xs hover:bg-wedding-olive hover:text-white transition-all disabled:opacity-50"
            >
              {isLoading ? 'Crafting Message...' : 'Generate Message with AI'}
            </button>
          </div>

          {generatedMessage && (
            <div className="mt-8 p-6 bg-wedding-cream/30 rounded-lg animate-fade-in">
              <label className="block text-xs uppercase tracking-wide text-gray-500 mb-2">Your Message</label>
              <textarea
                value={generatedMessage}
                onChange={(e) => setGeneratedMessage(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-wedding-oliveDark font-serif italic text-lg focus:ring-0 resize-none mb-4"
                rows={3}
              />
              <input
                type="text"
                placeholder="Sign your name"
                className="w-full bg-transparent border-b border-wedding-olive/30 py-1 mb-4 text-sm focus:outline-none focus:border-wedding-olive"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <button
                onClick={handleSign}
                disabled={!guestName}
                className="text-xs uppercase font-bold text-wedding-olive hover:text-wedding-oliveDark"
              >
                Sign Guestbook →
              </button>
            </div>
          )}
        </div>

        {/* Right: Entries */}
        <div className="bg-wedding-cream p-8 md:p-12 h-fit max-h-[600px] overflow-y-auto">
          <h3 className="font-serif text-2xl text-wedding-oliveDark mb-8 text-center">Recent Wishes</h3>
          <div className="space-y-8">
            {entries.map((entry, idx) => (
              <div key={idx} className="text-center border-b border-wedding-olive/10 pb-6 last:border-0">
                <p className="font-serif text-lg text-wedding-oliveDark italic mb-2">"{entry.message}"</p>
                <p className="font-sans text-xs uppercase tracking-widest text-gray-500">— {entry.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};