# Expense Tracker (JavaScript)

A simple **Expense Tracker** built with **Vanilla JavaScript**, **HTML**, and **CSS**.
It allows users to add income and expenses, view balance statistics, and persist data using **localStorage**.

---

## ✨ Features

* ➕ Add income and expense transactions
* 📊 Automatically calculate:

  * Total Income
  * Total Expense
  * Current Balance
* 🗑️ Delete individual transactions
* 💾 Data saved in **localStorage** (persists after refresh)
* ⏰ Shows date & time for each transaction

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Browser `localStorage`

---

## 📂 Project Structure

```text
project-folder/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

---

## 🚀 How It Works

1. User submits a transaction using the form
2. Transaction is stored as an object:

```js
{
  id: Number,
  source: String,
  amount: Number,
  time: String
}
```

3. Transactions are:

   * Stored in `localStorage`
   * Rendered dynamically into **Income** or **Expense** lists
4. Statistics are recalculated after every add/delete action

---

## 📸 UI Logic

* **Positive amount** → Income list
* **Negative amount** → Expense list
* Expense values are displayed using `Math.abs()` for better readability

---

## ▶️ Usage

1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

2. Open `index.html` in your browser

3. Start adding income & expenses 🎉

---

## 🧪 Example

* Income: `Salary +500`
* Expense: `Food -200`

**Balance:** `300`

---

## 🔒 Local Storage Key

```js
localStorage.setItem("transactions", JSON.stringify(transactions));
```

---

## 📌 Future Improvements

* Edit transaction feature
* Monthly / yearly filters
* Currency formatting
* Chart visualization

---

## 👨‍💻 Author

**TUN TUN OO**
Learning & practicing JavaScript fundamentals 🚀

---

## 📄 License

This project is open-source and free to use.
