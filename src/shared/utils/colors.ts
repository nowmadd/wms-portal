const colors = {
    rgbToHex: (r: number, g: number, b: number) => {
  
        r = Math.max(0, Math.min(r, 255)); 
        g = Math.max(0, Math.min(g, 255)); 
        b = Math.max(0, Math.min(b, 255)); 
    
        const rHex: string = r.toString(16).padStart(2, '0');
        const gHex: string = g.toString(16).padStart(2, '0');
        const bHex: string = b.toString(16).padStart(2, '0'); 
        return `#${rHex}${gHex}${bHex}`;
        
    },
    rgbToHsl: (r: number, g: number, b: number) => {
        // Normalize RGB values to range 0 to 1
        const normalizedR = r / 255;
        const normalizedG = g / 255;
        const normalizedB = b / 255;
    
        // Calculate max and min values for RGB
        const max = Math.max(normalizedR, normalizedG, normalizedB);
        const min = Math.min(normalizedR, normalizedG, normalizedB);
    
        let h = 0;
        let s, l;

        l = (max + min) / 2;
    
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
            switch (max) {
                case normalizedR:
                    h = (normalizedG - normalizedB) / d + (normalizedG < normalizedB ? 6 : 0);
                    break;
                case normalizedG:
                    h = (normalizedB - normalizedR) / d + 2;
                    break;
                case normalizedB:
                    h = (normalizedR - normalizedG) / d + 4;
                    break;
            }
    
            h /= 6;
        }
    
        return {
            h: Math.round(h * 360), // Convert hue to degrees (0 to 360)
            s: Math.round(s * 100), // Convert saturation to percentage (0 to 100)
            l: Math.round(l * 100) // Convert lightness to percentage (0 to 100)
        };
    },
    hslToRgb: (h: number, s: number, l: number) => {

        h = (h % 360 + 360) % 360; 
        s = Math.max(0, Math.min(s, 100)); 
        l = Math.max(0, Math.min(l, 100));
      
        const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l / 100 - c / 2;
      
        let r, g, b;
        if (h >= 0 && h < 60) {
          [r, g, b] = [c, x, 0];
        } else if (h >= 60 && h < 120) {
          [r, g, b] = [x, c, 0];
        } else if (h >= 120 && h < 180) {
          [r, g, b] = [0, c, x];
        } else if (h >= 180 && h < 240) {
          [r, g, b] = [0, x, c];
        } else if (h >= 240 && h < 300) {
          [r, g, b] = [x, 0, c];
        } else {
          [r, g, b] = [c, 0, x];
        }
      
        const r255 = Math.floor((r + m) * 255);
        const g255 = Math.floor((g + m) * 255);
        const b255 = Math.floor((b + m) * 255);
      
        return { r: r255, g: g255, b: b255 };
    },
    hslToHex: (h: number, s: number, l: number) => {
        // Normalize h, s, and l values to ranges 0 to 1
        const normalizedH = h / 360;
        const normalizedS = s / 100;
        const normalizedL = l / 100;
    
        // Function to convert a single color component to a hexadecimal string
        const componentToHex = (c: number) => {
            const hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
    
        // Convert HSL to RGB
        let r, g, b;
    
        if (normalizedS === 0) {
            r = g = b = normalizedL; // achromatic (gray) color
        } else {
            const hueToRgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
    
            const q = normalizedL < 0.5 ? normalizedL * (1 + normalizedS) : normalizedL + normalizedS - normalizedL * normalizedS;
            const p = 2 * normalizedL - q;
    
            r = hueToRgb(p, q, normalizedH + 1 / 3);
            g = hueToRgb(p, q, normalizedH);
            b = hueToRgb(p, q, normalizedH - 1 / 3);
        }
    
        // Convert RGB to hexadecimal color string
        const hexR = componentToHex(r);
        const hexG = componentToHex(g);
        const hexB = componentToHex(b);
    
        return "#" + hexR + hexG + hexB;
    },
    hexToHsl: (hex: string) => {
        // Remove the "#" symbol if present
        hex = hex.replace("#", "");
    
        // Convert hexadecimal color to RGB
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
    
        // Calculate max and min values for RGB
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
    
        let h = 0;
        let s, l;
        l = (max + min) / 2;
    
        if (max === min) {
            h = s = 0; // achromatic (gray) color
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
    
            h /= 6;
        }
    
        return {
            h: Math.round(h * 360), // Convert hue to degrees (0 to 360)
            s: Math.round(s * 100), // Convert saturation to percentage (0 to 100)
            l: Math.round(l * 100) // Convert lightness to percentage (0 to 100)
        };
    },
    hexToRgb: (hex: string) => {
        // Remove the "#" symbol if present
        hex = hex.replace("#", "");
    
        // Get the red, green, and blue components from the hexadecimal string
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
    
        return { r, g, b };
    },
    getRelativeLuminanceRGB: (r: number, g: number, b: number) => { //formula for relative luminance of a color
        
        const gammaCorrect = (value: number) => {
            value /= 255;
            if (value <= 0.03928) {
                return value / 12.92;
            } else {
                return Math.pow((value + 0.055) / 1.055, 2.4);
            }
        };
      
        const linearR = gammaCorrect(r);
        const linearG = gammaCorrect(g);
        const linearB = gammaCorrect(b);
      
        return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
    },
    getRelativeLuminanceHSL: (h: number, s: number, l: number) => {
        const normalizedH = h / 360;
        const normalizedS = s / 100;
        const normalizedL = l / 100;
    
        let r, g, b;
    
        if (normalizedS === 0) {
            r = g = b = normalizedL; // achromatic (gray) colors
        } else {
            const hueToRgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
    
            const q = normalizedL < 0.5 ? normalizedL * (1 + normalizedS) : normalizedL + normalizedS - normalizedL * normalizedS;
            const p = 2 * normalizedL - q;
    
            r = hueToRgb(p, q, normalizedH + 1 / 3);
            g = hueToRgb(p, q, normalizedH);
            b = hueToRgb(p, q, normalizedH - 1 / 3);
        }
    
        return colors.getRelativeLuminanceRGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    },
    getContrastRatio: (backgroundLuminance: number, foregroundLuminance: number) => {
        return  (Math.max(backgroundLuminance, foregroundLuminance) + 0.05) / (Math.min(backgroundLuminance, foregroundLuminance) + 0.05);
    },
    createRandomDarkHSL: () => {
        return {
           
            h: Math.floor(Math.random() * 360), // Generate integer hue value between 0 and 359
            s: Math.floor(35 + 20 * Math.random()), // Generate integer saturation value between 35 and 54  //To avoid lighter color
            l: Math.floor(45 + 20 * Math.random()) // Generate integer lightness value between 45 and 64 //To avoid lighter color
        }
    },
    createRandomSafeColorHSL: (minContrastRatio: number, maxContrastRatio: number, foregroundColor: string) => {
        
        const isValidContrast = (h: number, s: number, l: number) => {
            const foregroundColorHSL = colors.hexToHsl(foregroundColor);
            const generatedLuminance = colors.getRelativeLuminanceHSL(h, s, l);
            const foregroundColorLuminance = colors.getRelativeLuminanceHSL(foregroundColorHSL.h, foregroundColorHSL.s, foregroundColorHSL.l);
            const contrastRatio = colors.getContrastRatio(generatedLuminance, foregroundColorLuminance)
            return contrastRatio >= minContrastRatio && contrastRatio <= maxContrastRatio;
        };
        
        let randomHsl = colors.createRandomDarkHSL();
        while (!isValidContrast(randomHsl.h, randomHsl.s, randomHsl.l)) {
            randomHsl = colors.createRandomDarkHSL();
        }
        return randomHsl;
    }
}


export default colors;