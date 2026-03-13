# Saran Sri Datha Madhipati - Professional Portfolio

This repository contains the source code for my professional portfolio, designed with a focus on systems engineering, site reliability, and cloud infrastructure. The interface is modeled after a high-end engineering workstation, featuring interactive system topologies and virtualized environments.

## Core Features

### 1. 3D Infrastructure Topology
An interactive 3D visualization of the technical stack built using Three.js and React Three Fiber. Nodes are logically connected based on real-world architectural dependencies (e.g., Development -> CI/CD -> Containers -> Orchestration -> Cloud).

### 2. Virtual File System (VFS) Terminal
A fully functional interactive shell that simulates a Linux environment.
- Path Navigation: cd, pwd, and relative path support (../).
- File Operations: cat command for reading project and experience manifests.
- Power User Features: Tab completion and command history (Arrow keys).
- System Commands: uname, date, status, and history.

### 3. Multi-Distro Theme Engine
A dynamic theming system that reconfigures the UI's aesthetic, typography, and accent colors based on major Linux distributions:
- Fedora: Red Hat Display / Red Hat Mono
- Arch Linux: IBM Plex Sans / IBM Plex Mono
- Ubuntu: Ubuntu Font / Ubuntu Mono
- Dracula & Gruvbox themes for high-contrast engineering environments.

### 4. Altitude-Based Scroll HUD
A vertical progress tracker that maps page scroll depth to Himalayan altitudes, transitioning from Basecamp (5,364m) to the Everest Summit (8,848m), integrating personal trekking interests with technical UI.

## Technical Stack

- Frontend: React 18, TypeScript 5
- Styling: Tailwind CSS (CSS Variables for dynamic theming)
- 3D Engine: Three.js, @react-three/fiber, @react-three/drei
- Animation: GSAP (ScrollTrigger), Framer Motion
- Components: Radix UI (shadcn/ui)
- Smooth Scrolling: Lenis

## Development

### Prerequisites
- Node.js (v20+)
- npm or bun

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/saransridatha/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Infrastructure and Deployment

The portfolio is deployed behind an Nginx reverse proxy with SSL termination via Cloudflare.

### Proxy Configuration
```nginx
server {
    listen 443 ssl;
    server_name saran.srebuilds.tech;

    ssl_certificate /etc/nginx/ssl/srebuilds.pem;
    ssl_certificate_key /etc/nginx/ssl/srebuilds.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## License
MIT
