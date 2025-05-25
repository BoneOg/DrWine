import Layout from '@/components/layout'; 
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Checkout({ reservation }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({});

  const paymentMethods = [
    { name: 'GCash', icon: '📱' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'Visa', icon: '💳' },
    { name: 'PayMaya', icon: '📲' },
    { name: 'PayPal', icon: '🅿️' }
  ];

  const handlePayment = () => {
    if (!selectedMethod) return;

    router.post('/transactions', {
      reservationID: reservation.reservationID,
      amount: 20,
      transaction_type: 'reservation',
      payment_method: selectedMethod,
    });
  };

  const handleCancel = () => {
    router.delete(`/reservation/${reservation.reservationID}/cancel`);
  };

  // Inputs UI per payment method
  const renderPaymentInputs = () => {
    switch (selectedMethod) {
      case 'GCash':
        return (
          <div className="space-y-3">
            <input
              type="tel"
              placeholder="GCash Mobile Number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentInfo.mobile || ''}
              onChange={e => setPaymentInfo({ ...paymentInfo, mobile: e.target.value })}
            />
            <input
              type="text"
              placeholder="Reference Number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentInfo.ref || ''}
              onChange={e => setPaymentInfo({ ...paymentInfo, ref: e.target.value })}
            />
          </div>
        );
      case 'Mastercard':
      case 'Visa':
        return (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentInfo.name || ''}
              onChange={e => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
            />
            <input
              type="text"
              maxLength={16}
              placeholder="Card Number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentInfo.cardNumber || ''}
              onChange={e => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
            />
            <div className="flex gap-4">
              <input
                type="text"
                maxLength={5}
                placeholder="Expiry (MM/YY)"
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentInfo.expiry || ''}
                onChange={e => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
              />
              <input
                type="text"
                maxLength={3}
                placeholder="CVV"
                className="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentInfo.cvv || ''}
                onChange={e => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
              />
            </div>
          </div>
        );
      case 'PayMaya':
        return (
          <div className="space-y-3">
            <input
              type="email"
              placeholder="PayMaya Email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentInfo.email || ''}
              onChange={e => setPaymentInfo({ ...paymentInfo, email: e.target.value })}
            />
          </div>
        );
      case 'PayPal':
        return (
          <div className="space-y-3">
            <input
              type="email"
              placeholder="PayPal Email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentInfo.email || ''}
              onChange={e => setPaymentInfo({ ...paymentInfo, email: e.target.value })}
            />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      <Head title="Checkout" />
      <Layout>
        <div className="min-h-screen bg-gray-50 pt-24 px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-900">Review & Pay</h1>

            <section className="bg-gray-100 p-6 rounded-md shadow-inner space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Reservation Summary</h2>
              <p><strong>Name:</strong> {reservation.customer?.name}</p>
              <p><strong>Phone:</strong> {reservation.customer?.phone}</p>
              <p><strong>Email:</strong> {reservation.customer?.email}</p>
              <p><strong>Date & Time Slot:</strong> {new Date(reservation.date_time).toLocaleString()}</p>
              <p><strong>Guest Size:</strong> {reservation.size}</p>
              <p><strong>Reservation Fee:</strong> $20</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Payment Method</h2>
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map(({ name, icon }) => (
                  <label
                    key={name}
                    className={`cursor-pointer border rounded-lg p-4 flex items-center gap-3 text-lg font-medium transition
                      ${selectedMethod === name
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-300 bg-white hover:bg-gray-100'}
                    `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={name}
                      className="hidden"
                      checked={selectedMethod === name}
                      onChange={() => {
                        setSelectedMethod(name);
                        setPaymentInfo({});
                      }}
                    />
                    <span className="text-3xl">{icon}</span> {name}
                  </label>
                ))}
              </div>

              {selectedMethod && (
                <div className="mt-6">
                  {renderPaymentInputs()}
                </div>
              )}
            </section>

            <div className="flex justify-between mt-8">
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition font-semibold shadow"
                onClick={handleCancel}
              >
                Cancel Reservation
              </button>

              <button
                className={`px-6 py-3 rounded-md font-semibold transition shadow
                  ${selectedMethod
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
                `}
                onClick={handlePayment}
                disabled={!selectedMethod}
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
