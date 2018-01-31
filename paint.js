
// Height of each character block
const width = 10;
const height = 16;

let painting = false;

window.addEventListener('load', () => {
	const paint = document.getElementById('paint');
	const colour = document.getElementById('colour');
	const rubber = document.getElementById('rubber');
	const output = document.getElementById('output');
	const canvas = paint.getContext('2d');

	console.log(paint);

	const down = (x, y) => {
		let outString = '';
		if (rubber.checked) {
			canvas.clearRect(x, y, width, height);
		} else {
			canvas.fillRect(x, y, width, height);
		}

		let i = 0;
		let j = 0;
		let beforeColour = 'transparent';

		for (j = 0; j < paint.height; j += height) {
			for (i = 0; i < paint.width; i += width) {
				const data = canvas.getImageData(i, j, 1, 1).data;
				let currentColour;
				let outColour;
				if (data[3]) {
					currentColour = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
					outColour = `\\x1b[38;2;${data[0]};${data[1]};${data[2]}m`;
				} else {
					currentColour = 'transparent';
					outColour = '\\x1b[0m';
				}

				if (beforeColour !== currentColour) {
					beforeColour = currentColour;
					outString += outColour;
				}
				outString += ' ';
			}
			outString += '\n';
		}
		output.innerHTML = outString;
	}

	paint.addEventListener('mousedown', (e) => {
		const x = Math.floor((e.x - paint.offsetLeft) / width) * width;
		const y = Math.floor((e.y - paint.offsetTop) / height) * height;
		console.log(`x: ${x}\ny: ${y}`);
		canvas.fillStyle = colour.value;
		down(x, y);
		
		painting = true;
	});

	paint.addEventListener('mousemove', (e) => {
		const x = Math.floor((e.x - paint.offsetLeft) / width) * width;
		const y = Math.floor((e.y - paint.offsetTop) / height) * height;
		if (painting) {
			down(x, y);
		}
	})

	paint.addEventListener('mouseup', () => {
		painting = false;
	});

	paint.addEventListener('mouseout', () => {
		painting = false;
	});
});
