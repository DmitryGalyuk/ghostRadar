class Ghost {
    constructor(distancePercent, angle) {
        this.distance = distancePercent;
        this.angle = angle;
    }

    // polar to cartesian: x*sin
    // cartesian to screen: screenX = cartX + screen_width/2
    // translate (parallel shift): x'=x-50
    // rotate coordinates alpha and shift (a,b): x' = (x-a)*cos(alpha)+(y-b)*sin(alpha)
    get left() {
        return this._cartX / 2 + 50;
    }

    // polar to cartesian: y*cos
    // cartesian to screen: screenY = screen_height/2 - cartY
    // translate (parallel shift): y'=y-50
    // rotate coordinates alpha and shift (a,b): y' = -(x-a)*sin(alpha)+(y-b)*cos(alpha)
    get top() {
        return this._cartY / 2 + 50;
    }

    get _cartX() { return Math.floor(this.distance * Math.cos(Ghost._radian(this.angle))) }
    get _cartY() { return Math.floor(this.distance * Math.sin(Ghost._radian(this.angle))) }

    animationDelay(cycleTime) {
        return cycleTime * 1000 * (this.angle - 90) / 360;
    }

    static _radian(degree) {
        return degree * Math.PI / 180;
    }
}