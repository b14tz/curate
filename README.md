<a name="readme-top"></a>

<!-- PROJECT LOGO -->

# Curate - A Music Sharing Platform

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a></li>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#resources">Resources</a></li>
  </ol>
</details>

## Built With

- [React (TypeScript Vite)](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI Components](https://ui.shadcn.com/)
- [NodeJS/Express (TypeScript)](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Node (Version 16+)
- NPM (Version 8+)
- Python (Version 3.9+)

### Installation

Install all the required packages in the `client` and `server` directory

```
cd client && npm i

cd server && npm i
```

Install the Python packages from `requirements.txt`

```
pip install -r requirements.txt
```

Install [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html) (which the `pdfkit` Python package uses)

```
sudo apt install wkhtmltopdf
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

To run the project locally

### Prerequisites

#### Client

1.  Create a `.env` file in the `/client` directory
2.  Add the following to the `.env` file

```
VITE_SERVER_URL={SERVER_URL}/api
VITE_SECRET_KEY={32 characters long base64 string}
```

Where the `SERVER_URL` is the address to the server, either `http://localhost:3300` or `YOUR_IP:3300` or any other port you desire.

You can use this [Base64 String Generator](https://generate.plus/en/base64) to generate the secret key.

#### Server

1.  Create a `.env` file in the `/server` directory
2.  Add the following to the `.env` file

```
```

Refer to the [Prisma Documentation](https://pris.ly/d/connection-strings) regarding connection strings.

### Running both client and server simultaneously

1. Run the command `npm run dev` at the root directory

### Running client and server independently

#### Client

1.  Run the client by running `npm run dev` in the `/client` directory

#### Server

1.  Run the server by running `npm run dev` in the `/server` directory

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Resources

- [Database Schema](https://dbdiagram.io/d/6489cc7e722eb77494f57f59)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
