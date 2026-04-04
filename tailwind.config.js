/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			'xs': '360px',
			'sm': '480px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			fontFamily: {
				'satoshi': ['Satoshi', 'sans-serif'],
				'space-grotesk': ['Space Grotesk', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			fontDisplay: {
				'swap': 'swap',
			},
			colors: {
				'background': {
					primary: '#0A051A',
					secondary: '#0E0825',
				},
				'accent': {
					purple: '#A66CFF',
					blue: '#6EC3FF',
				},
				'text': {
					primary: '#FFFFFF',
					secondary: '#F0F0F0',
					muted: '#B8B8B8',
					lilac: '#D4CCFF',
				},
			},
			backgroundImage: {
				'glass': 'rgba(255, 255, 255, 0.05)',
				'glass-border': 'rgba(255, 255, 255, 0.12)',
			},
			backdropBlur: {
				sm: '4px',
				md: '25px',
			},
			boxShadow: {
				'glass': '0 8px 40px rgba(0, 0, 0, 0.45)',
				'glow-purple': '0 0 20px rgba(166, 108, 255, 0.3)',
				'glow-blue': '0 0 20px rgba(110, 195, 255, 0.3)',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'particle': 'particle 20s linear infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				glow: {
					'0%': { boxShadow: '0 0 20px rgba(166, 108, 255, 0.3)' },
					'100%': { boxShadow: '0 0 30px rgba(166, 108, 255, 0.6)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				particle: {
					'0%': { transform: 'translateY(100vh) translateX(0px)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(-100vh) translateX(100px)', opacity: '0' },
				},
			},
			transitionProperty: {
				'all': 'all',
			},
			transitionDuration: {
				'300': '300ms',
				'500': '500ms',
			},
		},
	},
	plugins: [],
}
