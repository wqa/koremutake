/*                                                                             
Copyright (c) 2017, Magnus Bodin                                               
                                                                                
Permission is hereby granted, free of charge, to any person obtaining a copy    
of this software and associated documentation files (the "Software"), to deal   
in the Software without restriction, including without limitation the rights    
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell       
copies of the Software, and to permit persons to whom the Software is           
furnished to do so, subject to the following conditions:                        
                                                                                
The above copyright notice and this permission notice shall be included in      
all copies or substantial portions of the Software.                             
                                                                                
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR      
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,        
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE     
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER          
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,   
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN       
THE SOFTWARE.                                                                   
*/
if(!expect){
	function expect(a){
		return {
			toBe: function(b){
				require('assert').strictEqual(a, b);
			}
		};
	}
}
var koremutake = require('../lib/koremutake/');

describe('koremutake', function() {
    it('should encode', function() {
        expect(koremutake.encode(0)).toBe('ba');
        expect(koremutake.encode(127)).toBe('tre');
        expect(koremutake.encode(128)).toBe('beba');
        expect(koremutake.encode(256)).toBe('biba');
        expect(koremutake.encode(128**2)).toBe('bebaba');
        expect(koremutake.encode(128**2 - 1)).toBe('tretre');
        expect(koremutake.encode(128**3)).toBe('bebababa');
        expect(koremutake.encode(10610353957)).toBe('koremutake');
        expect(koremutake.encode(4398046511103)).toBe('tretretretretretre');
        expect(koremutake.encode(46767000067)).toBe('beluhujegibo');
    });
    
    
    it('should decode', function() {
        expect(koremutake.decode('ba')).toBe(0);
        expect(koremutake.decode('tre')).toBe(127);
        expect(koremutake.decode('beba')).toBe(128);
        expect(koremutake.decode('biba')).toBe(256);
        expect(koremutake.decode('bebaba')).toBe(128**2);
        expect(koremutake.decode('tretre')).toBe(128**2 - 1);
        expect(koremutake.decode('bebababa')).toBe(128**3);
        expect(koremutake.decode('tretretre')).toBe(128**3 - 1);
        expect(koremutake.decode('koremutake')).toBe(10610353957);
        expect(koremutake.decode('tretretretretretre')).toBe(4398046511103);
        expect(koremutake.decode('ba')).toBe(0);
        expect(koremutake.decode('bababababa')).toBe(0);
        expect(koremutake.decode('babatre')).toBe(127);
        expect(koremutake.decode('beluhujegibo')).toBe(46767000067);
    });
    
});
