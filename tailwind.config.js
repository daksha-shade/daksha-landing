/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: 'hsl(var(--foreground))',
                        h1: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '700',
                            fontSize: '2.25rem',
                            lineHeight: '2.5rem',
                            marginBottom: '1rem',
                        },
                        h2: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                            fontSize: '1.875rem',
                            lineHeight: '2.25rem',
                            marginBottom: '0.875rem',
                        },
                        h3: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                            fontSize: '1.5rem',
                            lineHeight: '2rem',
                            marginBottom: '0.75rem',
                        },
                        h4: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                            marginBottom: '0.625rem',
                        },
                        h5: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                            fontSize: '1.125rem',
                            lineHeight: '1.75rem',
                            marginBottom: '0.5rem',
                        },
                        h6: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            marginBottom: '0.5rem',
                        },
                        p: {
                            color: 'hsl(var(--foreground))',
                            marginBottom: '1rem',
                            lineHeight: '1.75',
                        },
                        a: {
                            color: 'hsl(var(--primary))',
                            textDecoration: 'underline',
                            textUnderlineOffset: '4px',
                            '&:hover': {
                                color: 'hsl(var(--primary))',
                                opacity: '0.8',
                            },
                        },
                        strong: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                        },
                        em: {
                            color: 'hsl(var(--foreground))',
                        },
                        code: {
                            color: 'hsl(var(--foreground))',
                            backgroundColor: 'hsl(var(--muted))',
                            padding: '0.125rem 0.25rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.875rem',
                            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                        },
                        pre: {
                            backgroundColor: 'hsl(var(--muted))',
                            color: 'hsl(var(--foreground))',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            overflow: 'auto',
                            fontSize: '0.875rem',
                        },
                        blockquote: {
                            color: 'hsl(var(--muted-foreground))',
                            borderLeftColor: 'hsl(var(--primary))',
                            borderLeftWidth: '4px',
                            paddingLeft: '1rem',
                            fontStyle: 'italic',
                            marginBottom: '1rem',
                        },
                        ul: {
                            color: 'hsl(var(--foreground))',
                            listStyleType: 'disc',
                            paddingLeft: '1.5rem',
                            marginBottom: '1rem',
                            '> li': {
                                marginBottom: '0.5rem',
                                lineHeight: '1.75',
                            },
                        },
                        ol: {
                            color: 'hsl(var(--foreground))',
                            listStyleType: 'decimal',
                            paddingLeft: '1.5rem',
                            marginBottom: '1rem',
                            '> li': {
                                marginBottom: '0.5rem',
                                lineHeight: '1.75',
                            },
                        },
                        li: {
                            color: 'hsl(var(--foreground))',
                            lineHeight: '1.75',
                        },
                        hr: {
                            borderColor: 'hsl(var(--border))',
                            marginTop: '1.5rem',
                            marginBottom: '1.5rem',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
}