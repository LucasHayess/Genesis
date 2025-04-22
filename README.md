# 🧱 Genesis - 去中心化众筹平台

**Genesis** 是一个基于以太坊的去中心化众筹应用，使用 **React、Tailwind CSS、Ethers.js 和 Foundry (Forge)** 构建，当前部署在本地测试链 **Anvil** 上。项目旨在为用户提供一个安全、透明、高效的众筹解决方案。

---

## ✨ 功能特性

- 🦊 钱包连接（支持 MetaMask）
- 📤 创建众筹项目（合约部署）
- 💰 用户参与捐助
- 📈 众筹进度实时可视化
- 🔐 智能合约资金托管与提款管理

---

## 🧰 技术栈

| 类别       | 工具/技术                |
| ---------- | ------------------------ |
| 智能合约   | Solidity + Foundry       |
| 本地链     | Anvil（随 Foundry 附带） |
| 区块链连接 | Ethers.js                |
| 前端开发   | React 18                 |
| UI 框架    | Tailwind CSS v3          |

---

## 🚀 快速启动

### 1. 环境准备

确保你已安装以下工具：

- Node.js
- Foundry（安装命令如下）：

```
- MetaMask 插件

### 2. 克隆项目

git clone https://github.com/LucasHayess/Genesis.git
cd Genesis


### 3. 启动本地链

anvil

### 4. 编译并部署合约

forge create --private-key ${OWNER_PRIVATEKEY} src/contracts/Genesis.sol:Genesis --constructor-args 5

### 5. 启动前端项目

yarn run start


默认访问地址：[http://localhost:3000]


## 📬 开发者

由 [@LucasHayess](https://github.com/LucasHayess) 开发维护，欢迎提出建议、Issue 或 PR！

---

## 📄 License

MIT License © 2025 LucasHayess
```
