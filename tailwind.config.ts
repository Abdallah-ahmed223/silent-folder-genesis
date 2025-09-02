
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'exo': ['Exo 2', 'system-ui', '-apple-system', 'sans-serif'],
				'neural': ['Exo 2', 'system-ui', '-apple-system', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Premium portfolio theme colors
				'cyber-blue': 'hsl(var(--cyber-blue))',
				'electric-cyan': 'hsl(var(--electric-cyan))',
				'neon-purple': 'hsl(var(--neon-purple))',
				'plasma-pink': 'hsl(var(--plasma-pink))',
				'quantum-green': 'hsl(var(--quantum-green))',
				'neural-orange': 'hsl(var(--neural-orange))',
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-neural': 'var(--gradient-neural)',
			},
			boxShadow: {
				'glow-primary': 'var(--glow-primary)',
				'glow-secondary': 'var(--glow-secondary)',
				'glow-accent': 'var(--glow-accent)',
				'shadow-neural': 'var(--shadow-neural)',
			},
			animation: {
				'neural-pulse': 'neural-pulse 4s ease-in-out infinite',
				'quantum-float': 'quantum-float 6s ease-in-out infinite',
				'hologram-sweep': 'hologram-sweep 3s linear infinite',
				'grid-flow': 'grid-flow 20s linear infinite',
				'data-stream': 'data-stream 3s linear infinite',
				'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'gradient-shift': 'gradient-shift 3s ease-in-out infinite alternate',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
				'rotate-3d': 'rotate-3d 20s linear infinite',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'neural-pulse': {
					'0%, 100%': {
						'background-position': '0% 50%',
						'filter': 'hue-rotate(0deg) brightness(1)',
					},
					'25%': {
						'background-position': '100% 50%',
						'filter': 'hue-rotate(90deg) brightness(1.2)',
					},
					'50%': {
						'background-position': '200% 50%',
						'filter': 'hue-rotate(180deg) brightness(1.1)',
					},
					'75%': {
						'background-position': '300% 50%',
						'filter': 'hue-rotate(270deg) brightness(1.2)',
					},
				},
				'quantum-float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotateX(0deg)',
					},
					'25%': {
						transform: 'translateY(-20px) rotateX(5deg)',
					},
					'50%': {
						transform: 'translateY(-40px) rotateX(0deg)',
					},
					'75%': {
						transform: 'translateY(-20px) rotateX(-5deg)',
					},
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
