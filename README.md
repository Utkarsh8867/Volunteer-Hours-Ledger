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

## Photo


<img width="1914" height="974" alt="Screenshot 2025-08-17 005840" src="https://github.com/user-attachments/assets/521a2711-254d-425f-b905-be989580b288" />



**Frontend**
- React + TailwindCSS (UI)  
- Petra Wallet Integration (Aptos wallet)  
- Aptos JavaScript SDK

##Photo

<img width="1919" height="979" alt="Screenshot 2025-08-19 033523" src="https://github.com/user-attachments/assets/e8eaac48-4927-4542-a29c-4fbbd55ede18" />

<img width="1882" height="967" alt="Screenshot 2025-08-19 033601" src="https://github.com/user-attachments/assets/8d6f257e-4b70-451d-bec1-4096fa4ff55f" />

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

## Vedio Demo





## 🚀 Project Setup

### 🔹 Smart Contract (Move)
```bash
aptos move init
aptos move compile
aptos move publish --profile default
