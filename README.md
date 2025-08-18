# Volunteer Hours Ledger ⏳📚

**Blockchain-based Verifiable Community Service Hours Tracking**  

This project is a **decentralized application (dApp)** built on the **Aptos Blockchain** using the **Move language**. It enables students to **log volunteer hours** and organizations/institutions to **verify** them in a transparent, tamper-proof, and decentralized manner.  

Educational institutions often require students to complete community service hours as part of **graduation requirements**. With this system, hours are securely recorded on-chain, ensuring **trust, authenticity, and immutability**.  

---

## ✨ Features

- 🔐 **Secure Logging**: Students can add their volunteer hours, tied to their Aptos wallet address.  
- 🧾 **Verifiable Records**: Every record is immutable on the blockchain, preventing fraud or tampering.  
- ⏰ **Timestamped Tracking**: Each entry is recorded with the blockchain timestamp for proof.  
- 🎓 **Graduation Requirement Support**: Institutions can easily verify if students meet hour thresholds.  
- 🌐 **User-Friendly Frontend**: React-based frontend with wallet (Petra) integration.  
- 🧩 **Scalable Design**: Can be extended for organizations, schools, or NGOs to issue verified hours.  

---

## 🏗️ Technology Stack

**Blockchain / Backend**
- [Aptos Blockchain](https://aptoslabs.com/)  
- [Move Language](https://github.com/move-language/move) (Smart Contracts)  
- Aptos Framework (`event`, `timestamp`, `account`)

##Photo


<img width="1914" height="974" alt="Screenshot 2025-08-17 005840" src="https://github.com/user-attachments/assets/521a2711-254d-425f-b905-be989580b288" />



**Frontend**
- React + TailwindCSS (UI)  
- Petra Wallet Integration (Aptos wallet)  
- Aptos JavaScript SDK

##Photo


<img width="1913" height="979" alt="Screenshot 2025-08-17 010256" src="https://github.com/user-attachments/assets/7aed74a0-3655-4dfa-83fa-0022ce7a17e3" />



<img width="1917" height="969" alt="Screenshot 2025-08-17 005953" src="https://github.com/user-attachments/assets/820f95d5-80f8-40bc-b910-70b6f0ee6eb9" />

---


## ⚙️ How It Works

1. **Students connect their wallet (Petra).**  
2. **Add volunteer hours** → Hours + Name are submitted via an on-chain transaction.  
3. **Ledger Smart Contract** stores the data securely:  
   - `name: vector<u8>`  
   - `hours: u64`  
   - `student_address: address`  
4. **Verification** → Schools/organizations fetch and view student records.  
5. **Frontend** displays all students with their names and total logged hours.  

---

## 🚀 Project Setup

### 🔹 Smart Contract (Move)
```bash
aptos move init
aptos move compile
aptos move publish --profile default

