# 🍔 Food Town

A responsive, single-page **fast food delivery website** built with plain HTML, CSS and JavaScript. Browse the menu, build a cart, apply a coupon, place an order and see your order history, all without any framework or backend.

Food Town delivers **inside the LPU campus and within 6 km of LPU**.

> Built as a CA2 project. This is a front-end demo: no real payments are processed and no data leaves your browser.

---

## ✨ Features

- **Menu with category filters**: Pizza, Burgers, Rolls and Drinks (or view All)
- **Shopping cart**: add items, increase or decrease quantity, live item count in the navbar
- **Price summary**: subtotal, discount, delivery fee and grand total update instantly
- **Coupon code**: use `FIRST10` for 10% off
- **Delivery fee rule**: Rs. 40 delivery fee, free on orders of Rs. 500 and above
- **Order form with validation**
  - Name (3 to 40 characters)
  - Indian mobile number (10 digits, starts with 6, 7, 8 or 9)
  - Address (10 to 150 characters)
  - Terms checkbox
- **Payment options**: Cash on delivery or Net banking (bank, account number and password fields appear only when Net banking is selected)
- **Order history**: past orders are saved in `localStorage` and shown on the Order History page, with a PAID badge for net banking orders
- **Toast notifications** when items are added to the cart
- **Single-page navigation**: Home, Cart, Delivery Areas, Order and Order History switch without reloading the page
- **FAQ section** using native `<details>` elements

## ♿ Accessibility and UX

- Skip to main content link
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`, `address`)
- Table captions and `scope` attributes
- Labelled form fields and `role="status"` live messages
- Visible keyboard focus styles
- Respects `prefers-reduced-motion`
- Mobile-first responsive layout using CSS Grid, Flexbox and `clamp()`

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox, animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Browser `localStorage` |

## 📁 Project Structure

```
Food-Town/
├── index.html   # Page structure and all sections
├── style.css    # Styling, layout, animations, responsive rules
├── script.js    # Menu, cart, coupon, form handling, order history
└── README.md
```

## 🚀 Getting Started

No installation or build step is needed.

1. Clone the repository
   ```bash
   git clone https://github.com/1amshiv/Food-Town.git
   ```
2. Open the folder
   ```bash
   cd Food-Town
   ```
3. Open `index.html` in any modern browser (or use the VS Code Live Server extension).

### Host it for free with GitHub Pages

1. Go to **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
3. Your site will be live at `https://1amshiv.github.io/Food-Town/`.

## 🧪 How to Try It

1. Pick a category and click **Add to cart** on a few items.
2. Open **Cart** and change quantities.
3. Enter `FIRST10` and click **Apply** to see the discount.
4. Click **Proceed to order**, fill in the form and place the order.
5. Open **Order History** to see your saved order.

## 🗺️ Delivery Areas

| Area | Time | Charge |
|------|------|--------|
| Inside LPU campus | 15-25 min | Rs. 40 |
| Within 3 km of LPU | 20-30 min | Rs. 40 |
| 3 to 6 km from LPU | 30-45 min | Rs. 60 |
| Above 6 km from LPU | Not available | - |

Delivery is free on orders of Rs. 500 and above.

## 🔮 Future Improvements

- Apply the distance-based delivery charge automatically in the cart
- Backend and database for real orders
- Real payment gateway integration
- User login and saved addresses
- More menu items, images and search

## 👤 Author

**Shivansh Tripathi**

- GitHub: [@1amshiv](https://github.com/1amshiv/)
- LinkedIn: [Shivansh Tripathi](https://www.linkedin.com/in/shivansh-tripathi-abbb2242a/)

