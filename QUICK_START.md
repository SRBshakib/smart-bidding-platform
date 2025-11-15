# Quick Start Guide - Unified Sidebar System

## 🚀 How to Use the New Sidebar

### For Any Page, Follow These 3 Steps:

## Step 1: Choose Your Sidebar Component

Based on user type, copy content from:

```
Farmer Pages    →  components/sidebar-farmer.html
Buyer Pages     →  components/sidebar-buyer.html  
Admin Pages     →  components/sidebar-admin.html
```

## Step 2: Replace Old Sidebar

Find the `<nav class="sidebar">...</nav>` section and replace it with your chosen component.

## Step 3: Verify Links

Make sure these are in your `<head>`:

```html
<link rel="stylesheet" href="css/sidebar.css" />
<link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet"/>
```

And before `</body>`:

```html
<script src="js/sidebar.js"></script>
```

## ✅ That's It!

The sidebar will automatically:
- ✓ Highlight the current page
- ✓ Save open/close state
- ✓ Support dark mode
- ✓ Show tooltips when collapsed
- ✓ Work on mobile devices

---

## 🎨 Visual Reference

### Sidebar States

**Open** (280px width):
```
┌─────────────────────────────┐
│  🌾 AgriMarket             │
│     Farmer Portal          │
├─────────────────────────────┤
│  🔍 Search...              │
├─────────────────────────────┤
│  🏠  Dashboard             │
│  ➕  Add Product           │
│  ⚖️  Bidding               │
│  🔔  Notifications    [8]  │
│  📊  Analytics             │
│  💰  Wallet                │
│  👤  Profile               │
├─────────────────────────────┤
│  🚪  Logout                │
│  🌙  Dark mode     [  ○  ] │
└─────────────────────────────┘
```

**Closed** (80px width):
```
┌─────┐
│  🌾 │
├─────┤
│  🔍 │
├─────┤
│  🏠 │
│  ➕ │
│  ⚖️ │
│  🔔 │
│  📊 │
│  💰 │
│  👤 │
├─────┤
│  🚪 │
│  🌙 │
└─────┘
```

---

## 📱 Responsive Behavior

| Screen Size | Behavior |
|------------|----------|
| Desktop (>768px) | Starts open (or last saved state) |
| Mobile (≤768px) | Starts collapsed automatically |

---

## 🎯 Current Status

### ✅ COMPLETE (5 Pages)
These pages already have the new sidebar:
1. `addProduct-new.html`
2. `farmerNotification-new.html`
3. `farmerBidding-new.html`
4. `farmerWallet-new.html`
5. `marketAnalysis.html`

### 🔄 TODO (19 Pages)
These pages need the sidebar update:

**Farmer (7 pages):**
- farmerdashboard.html
- farmerdashboard-new.html
- addProduct.html
- farmerProfile.html
- farmerBidding.html
- farmerNotification.html
- farmerWallet.html

**Buyer (7 pages):**
- buyerDashboard.html
- buyerDashboard-new.html
- byersProduct.html
- byerOrders.html
- buyerNotifications.html
- buyerAnalytics.html
- buyerWallet.html

**Admin (2 pages):**
- adminDashboard.html
- adminDashboard-new.html

**Other (3 pages):**
- index.html
- login.html
- sidebar.html

---

## 💡 Pro Tips

1. **Active Page Highlighting**: Works automatically if filename contains the `data-page` value
   - Example: `addProduct-new.html` matches `data-page="addproduct"`

2. **Update Notification Count**:
   ```javascript
   document.querySelector('.notification-badge').textContent = '12';
   ```

3. **Check Dark Mode State**:
   ```javascript
   const isDark = document.body.classList.contains('dark');
   ```

4. **Force Sidebar Open**:
   ```javascript
   document.querySelector('.sidebar').classList.remove('close');
   ```

---

## 🐛 Troubleshooting

### Sidebar not showing?
✓ Check if `css/sidebar.css` is linked
✓ Verify boxicons CSS is loaded
✓ Check browser console for errors

### Active page not highlighting?
✓ Ensure `data-page` attribute exists on nav-link
✓ Check if filename matches data-page value
✓ Verify `js/sidebar.js` is loaded

### Dark mode not working?
✓ Check if toggle-switch element exists
✓ Verify localStorage is enabled in browser
✓ Check if `js/sidebar.js` is loaded

---

## 📞 Need Help?

1. Check `SIDEBAR_DOCUMENTATION.md` for technical details
2. Check `SIDEBAR_SUMMARY.md` for project overview
3. Look at completed pages as examples

---

**Last Updated**: November 15, 2025
**Version**: 1.0
**Status**: Production Ready ✅
