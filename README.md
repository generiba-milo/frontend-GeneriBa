# GeneriBa Frontend - Web 2.5 Freelance Marketplace

**The Future of Freelancing: Where Web2 Meets Web3**

[![Discord](https://img.shields.io/discord/YOUR_DISCORD_ID?color=7289da&label=Discord&logo=discord&logoColor=white)](https://discord.gg/G43R8nnMTh)
[![Solana](https://img.shields.io/badge/Solana-Powered-14F195?logo=solana)](https://explorer.solana.com/address/FSFSmPKior2TJoEwMALubV5iMtSusyTXSN7tUBGnqRQp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Live App](https://earn.generiba.ai) • [Documentation](https://docs.generiba.ai) • [Pitch Deck](https://deck.generiba.ai) • [DAO](https://dao.generiba.ai) • [Smart Contract](https://github.com/generiba-milo/smartcontract-GeneriBa)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## 🌟 About

GeneriBa is a revolutionary Web 2.5 freelance marketplace that seamlessly bridges Web2 usability with Web3 innovation. Built on Solana blockchain, our platform empowers freelancers and clients with unprecedented flexibility in payments, instant access to loans, and DAO-powered governance.

### What is Web 2.5?

Web 2.5 combines the best of both worlds:
- **Web2**: Familiar user experience, easy onboarding, traditional payment options
- **Web3**: Blockchain transparency, cryptocurrency payments, decentralized governance

### Key Differentiators

- 💰 **Dual Payment System**: Choose between fiat or cryptocurrency payments
- ⚡ **Instant Upfront Loans**: Access working capital before project completion
- 🏛️ **DAO Governance**: Community-driven platform decisions
- 🔒 **Blockchain Security**: Transparent, immutable transaction records
- 🌍 **Global Access**: Work with anyone, anywhere, without borders

---

## ✨ Features

### For Freelancers

- **Profile Management**: Create stunning portfolios with skills, portfolio items, and work history
- **Job Discovery**: Browse and apply to projects matching your expertise
- **Flexible Payments**: Receive payments in stablecoins (USDC, USDT) or fiat currency
- **Upfront Loans**: Access loans to cover project expenses before completion
- **Reputation System**: Build trust with blockchain-verified reviews and ratings
- **Milestone Tracking**: Track project progress and automatic milestone releases

### For Clients

- **Talent Discovery**: Search and filter freelancers by skills, ratings, and experience
- **Project Posting**: Create detailed project listings with milestones and budgets
- **Escrow Protection**: Funds secured in smart contracts until work is approved
- **Multi-Payment Options**: Pay via crypto wallets or traditional payment methods
- **Dispute Resolution**: Fair arbitration through DAO governance
- **Real-time Communication**: Built-in messaging system

### Platform Features

- **DAO Voting Interface**: Participate in governance decisions
- **Analytics Dashboard**: Track earnings, spending, and project metrics
- **Wallet Integration**: Connect with Phantom, Solflare, and other Solana wallets
- **Smart Contract Automation**: Automatic payment releases on milestone completion
- **Notification System**: Real-time updates on projects, payments, and messages
- **Multi-language Support**: Platform available in multiple languages

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type safety and better DX

### Blockchain Integration
- **@solana/web3.js** - Solana blockchain interaction
- **@solana/wallet-adapter-react** - Wallet connectivity
- **@project-serum/anchor** - Anchor framework for Solana programs

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### State Management
- **Zustand** - Lightweight state management
- **React Query (TanStack Query)** - Server state management
- **Context API** - Wallet and user context

### Forms & Validation
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Payment Integration
- **Solana Pay SDK** - Cryptocurrency payments
- **Stripe API** - Fiat payment processing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting

### Testing
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **Solana Test Validator** - Blockchain testing

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git**
- **Solana Wallet** (Phantom, Solflare, etc.) - for testing Web3 features

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/generiba-milo/frontend-GeneriBa.git
cd frontend-GeneriBa
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start for Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
frontend-GeneriBa/
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/                     # Next.js app directory
│   │   ├── (auth)/             # Authentication routes
│   │   ├── (dashboard)/        # Dashboard routes
│   │   ├── (marketplace)/      # Marketplace routes
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── features/           # Feature-specific components
│   │   ├── layouts/            # Layout components
│   │   └── shared/             # Shared components
│   ├── hooks/                  # Custom React hooks
│   │   ├── useWallet.ts
│   │   ├── useContract.ts
│   │   └── useAuth.ts
│   ├── lib/                    # Library code
│   │   ├── solana/             # Solana utilities
│   │   ├── api/                # API clients
│   │   └── utils/              # Helper functions
│   ├── contexts/               # React contexts
│   │   ├── WalletContext.tsx
│   │   ├── AuthContext.tsx
│   │   └── DAOContext.tsx
│   ├── services/               # Business logic
│   │   ├── blockchain/         # Blockchain services
│   │   ├── payment/            # Payment services
│   │   └── api/                # API services
│   ├── types/                  # TypeScript types
│   │   ├── user.ts
│   │   ├── project.ts
│   │   └── contract.ts
│   ├── constants/              # Constants and configs
│   │   ├── contracts.ts
│   │   └── networks.ts
│   ├── styles/                 # Global styles
│   │   └── globals.css
│   └── config/                 # Configuration files
│       ├── site.ts
│       └── wallet.ts
├── tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/                    # GitHub configuration
│   ├── workflows/              # CI/CD workflows
│   └── ISSUE_TEMPLATE/         # Issue templates
├── docs/                       # Documentation
├── .env.example                # Environment variables example
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbopack (faster)

# Building
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript compiler check

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests

# Database (if applicable)
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
```

### Code Style Guide

We follow industry best practices:

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatCurrency.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `PROGRAM_ID`)
- **Hooks**: camelCase with "use" prefix (e.g., `useWallet.ts`)

### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git add .
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Create a Pull Request
```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=GeneriBa

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_PROGRAM_ID=FSFSmPKior2TJoEwMALubV5iMtSusyTXSN7tUBGnqRQp

# API Configuration
NEXT_PUBLIC_API_URL=https://api.generiba.ai
API_SECRET_KEY=your_secret_key_here

# Payment Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# DAO Configuration
NEXT_PUBLIC_DAO_ADDRESS=your_dao_address_here
NEXT_PUBLIC_DAO_REALM_ID=your_realm_id_here

# Database (if using)
DATABASE_URL=postgresql://user:password@localhost:5432/generiba

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Analytics (optional)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_DAO_VOTING=true
NEXT_PUBLIC_ENABLE_LOANS=true
NEXT_PUBLIC_ENABLE_FIAT_PAYMENTS=true
```

### Environment Variable Descriptions

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_PROGRAM_ID` | Solana program ID | Yes |
| `NEXT_PUBLIC_SOLANA_NETWORK` | Solana network (mainnet-beta, devnet) | Yes |
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `STRIPE_SECRET_KEY` | Stripe API secret key | For fiat payments |
| `NEXT_PUBLIC_DAO_ADDRESS` | DAO program address | For governance |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure environment variables**
   - Add all variables from `.env.local`

4. **Deploy**
   - Vercel will automatically deploy on every push to main

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### AWS Amplify
```bash
# Add amplify.yml configuration
npm run build
```

#### Docker
```dockerfile
# Dockerfile included in repository
docker build -t generiba-frontend .
docker run -p 3000:3000 generiba-frontend
```

### Production Checklist

- [ ] All environment variables configured
- [ ] Analytics tracking enabled
- [ ] Error monitoring set up (Sentry)
- [ ] Performance monitoring enabled
- [ ] Security headers configured
- [ ] SSL certificate installed
- [ ] CDN configured for static assets
- [ ] Database backup strategy in place

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Integration Tests

```bash
# Run integration tests
npm run test:integration
```

### E2E Tests

```bash
# Run Playwright tests
npm run test:e2e

# Run in UI mode
npm run test:e2e:ui

# Run specific test file
npm run test:e2e tests/login.spec.ts
```

### Testing Best Practices

- Write tests for all critical user flows
- Test blockchain interactions with Solana Test Validator
- Mock external API calls
- Aim for >80% code coverage
- Test accessibility with axe-core

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

### Contribution Process

1. **Fork the repository**

2. **Clone your fork**
```bash
git clone https://github.com/YOUR_USERNAME/frontend-GeneriBa.git
```

3. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Make your changes**
   - Follow code style guidelines
   - Add tests for new features
   - Update documentation

5. **Commit your changes**
```bash
git commit -m "feat: add your feature"
```

6. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request**
   - Provide clear description
   - Link related issues
   - Add screenshots if UI changes

### Code Review Process

- All PRs require at least one review
- CI/CD checks must pass
- Code coverage should not decrease
- Follow existing code patterns

### Development Guidelines

- Write clean, readable code
- Comment complex logic
- Use TypeScript types properly
- Follow accessibility standards
- Optimize for performance
- Test on multiple browsers

---

## 🌐 Links & Resources

### Official Links

| Resource | URL |
|----------|-----|
| **Website** | [generiba.ai](https://generiba.ai) |
| **Live App** | [earn.generiba.ai](https://earn.generiba.ai) |
| **Documentation** | [docs.generiba.ai](https://docs.generiba.ai) |
| **Pitch Deck** | [deck.generiba.ai](https://deck.generiba.ai) |
| **DAO Platform** | [dao.generiba.ai](https://dao.generiba.ai) |
| **NTT Pitch** | [side.generiba.ai](https://side.generiba.ai) |

### Community

- **Discord**: [discord.gg/G43R8nnMTh](https://discord.gg/G43R8nnMTh)
- **Smart Contract Repo**: [github.com/generiba-milo/smartcontract-GeneriBa](https://github.com/generiba-milo/smartcontract-GeneriBa)

### Developer Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🔒 Security

Security is our top priority. We follow industry best practices:

- All smart contract interactions are audited
- User data is encrypted at rest and in transit
- Regular security audits performed
- Bug bounty program active

### Reporting Security Issues

If you discover a security vulnerability:

- **DO NOT** create a public GitHub issue
- Email: security@generiba.ai
- Include detailed description and steps to reproduce
- Allow reasonable time for fix before disclosure

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Solana Foundation** - For blockchain infrastructure
- **Anchor Team** - For the development framework
- **Vercel** - For hosting and deployment
- **Our Community** - For feedback and contributions
- **Early Adopters** - For testing and support

---

## 📊 Project Status

- **Status**: 🟢 Active Development
- **Version**: 1.0.0
- **Last Updated**: December 2025
- **Blockchain**: Solana Mainnet
- **License**: MIT

---

## 🗺️ Roadmap

### Q1 2025
- ✅ Launch MVP on mainnet
- ✅ Implement core marketplace features
- 🔄 Beta testing with select users

### Q2 2025
- 🔄 Launch DAO governance
- 📋 Implement loan system
- 📋 Mobile app development

### Q3 2025
- 📋 Multi-chain support
- 📋 Advanced analytics dashboard
- 📋 Enterprise features

### Q4 2025
- 📋 Global expansion
- 📋 Additional payment methods
- 📋 AI-powered matching

*Legend: ✅ Completed | 🔄 In Progress | 📋 Planned*

---

## ❓ FAQ

**Q: Do I need cryptocurrency to use GeneriBa?**
A: No! You can use traditional payment methods. Cryptocurrency is optional.

**Q: How do upfront loans work?**
A: Freelancers can apply for loans based on their reputation and project value. Funds are provided before project completion.

**Q: Is my data secure?**
A: Yes. We use industry-standard encryption and security practices.

**Q: How does the DAO governance work?**
A: Token holders can vote on platform decisions, fee structures, and feature priorities.

**Q: What wallets are supported?**
A: We support Phantom, Solflare, and all Solana-compatible wallets.

---

## 💬 Support

Need help? We're here for you:

- 📖 Check our [Documentation](https://docs.generiba.ai)
- 💬 Join our [Discord](https://discord.gg/G43R8nnMTh)
- 🐛 Open an [Issue](https://github.com/generiba-milo/frontend-GeneriBa/issues)
- 📧 Email: support@generiba.ai

---

**Built with ❤️ by the GeneriBa Team**

*Your freelance journey just got smarter, faster, and more flexible!*

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=generiba-milo/frontend-GeneriBa&type=Date)](https://star-history.com/#generiba-milo/frontend-GeneriBa&Date)
