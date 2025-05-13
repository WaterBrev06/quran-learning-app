import React, { useState } from 'react';

const days = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const apiUrl = 'http://localhost:5000/api/schedule'; // Adjust for production

const MotherDashboard = () => {
  const [homeReview, setHomeReview] = useState({});
  const [loading, setLoading] = useState(false);

  // Replace these with real values from context/localStorage later
  const studentId = 'replace_with_real_student_id';
  const token = localStorage.getItem('token'); // get token from localStorage

  const toggleCheckbox = (day, index) => {
    setHomeReview(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [index]: !prev[day]?.[index]
      }
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      student: studentId,
      date: new Date(),
      homeReview: {
        mon: homeReview['الاثنين'] || [],
        tue: homeReview['الثلاثاء'] || [],
        wed: homeReview['الأربعاء'] || [],
        thu: homeReview['الخميس'] || [],
        fri: homeReview['الجمعة'] || [],
      }
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Submission failed');
      alert('✅ تم إرسال التقييم الأسبوعي بنجاح!');
    } catch (err) {
      console.error(err);
      alert('❌ فشل في الإرسال. تحقق من الاتصال أو الصلاحيات.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-10 text-right">
      <h2 className="text-2xl font-bold text-olive mb-4">مراجعة المنزل - الأم</h2>

      {days.map((day) => (
        <div key={day} className="mb-4">
          <h3 className="font-semibold text-peach mb-2">{day}</h3>
          <div className="flex gap-4">
            {[1, 2].map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-yellow focus:ring-yellow"
                  checked={homeReview[day]?.[slot] || false}
                  onChange={() => toggleCheckbox(day, slot)}
                />
                <span>تكرار {slot}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 px-6 py-2 bg-yellow text-white rounded-xl shadow hover:bg-yellow/80"
      >
        {loading ? 'جاري الإرسال...' : 'إرسال'}
      </button>
    </div>
  );
};

export default MotherDashboard;
