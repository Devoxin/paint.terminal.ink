const colourRX = new RegExp('^#([a-f0-9]{3}|[a-f0-9]{6})\\b', 'i');

const pencil = {
    create() {
        this.canvas = document.getElementById('paint');
        this.ctx = this.canvas.getContext('2d');

        this.drawing = false;
        this.createSnapshot();
        this.resize();

        this.canvas.addEventListener('mousedown', this.down.bind(this));
        this.canvas.addEventListener('mousemove', this.move.bind(this));
        this.canvas.addEventListener('mouseup', this.cancel.bind(this));
        this.canvas.addEventListener('mouseout', this.cancel.bind(this));
        document.getElementById('colour').addEventListener('change', this.setColour.bind(this));
        document.getElementById('pen').addEventListener('change', this.setTipSize.bind(this));
        window.addEventListener('resize', this.resize.bind(this));
    },
    down(event) {
        const x = event.x - this.canvas.offsetLeft;
        const y = event.y - this.canvas.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.drawing = true;
    },
    move(event) {
        if (!this.drawing) return;
        const x = event.x - this.canvas.offsetLeft;
        const y = event.y - this.canvas.offsetTop;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    },
    cancel() {
        this.drawing = false;
        this.createSnapshot();
    },
    setColour(colour) {
        if (colourRX.test(colour.target.value)) // Check for hexcodes
            this.ctx.strokeStyle = colour.target.value;
    },
    setTipSize(size) {
        size = Number(size.target.value);
        if (size)
            this.ctx.lineWidth = size;
    },
    createSnapshot() {
        this.state = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    },
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.putImageData(this.state, 0, 0);
    }
};

function save() {
    const download = document.getElementById('download');
    const canvas = document.getElementById('paint');

    const data = canvas.toDataURL('image/png').replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    download.setAttribute('href', data);
}

function setup() {
    pencil.create();
}
