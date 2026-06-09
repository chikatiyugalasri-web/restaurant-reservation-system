import { useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("reservations")
        .insert([
          {
            customer_name: name,
            email: email,
            reservation_date: date,
            reservation_time: time,
            guests: parseInt(guests),
          },
        ]);

      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        alert("Booking Failed");
        console.error(error);
      } else {
        alert("Reservation Confirmed!");

        setName("");
        setEmail("");
        setDate("");
        setTime("");
        setGuests("");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Restaurant Table Reservation System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Number of Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Reserve Table</button>
      </form>
    </div>
  );
}

export default App;