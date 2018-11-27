// @flow

export default (strokeColor, backgroundColor = '#FFFFFF') => (`
data:image/svg+xml;utf-8, 
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
<circle fill="${backgroundColor}" stroke="${strokeColor}" stroke-miterlimit="10" cx="16" cy="16" r="15"/>
<g>
<path fill="${strokeColor}" d="M11.678,9.5c0.844-0.502,2.505-1.219,4.271-0.484c2.419,1.006,3.279,2.998,6.945,0.363c0.315-0.226,0.56-0.108,0.56,0.28v6.862c0,0.388-0.214,0.933-0.506,1.187c-0.638,0.551-1.806,1.371-3.056,1.334c-1.879-0.062-3.694-2.053-5.396-2.053c-1.084,0-2.169,0.524-2.813,0.905c-0.333,0.195-0.586,0.066-0.586-0.317v-6.98C11.099,10.208,11.345,9.697,11.678,9.5z"/>
<path fill="${strokeColor}" d="M9.577,7.664c-0.569,0-1.029,0.46-1.029,1.029c0,0.145,0.03,0.284,0.086,0.408c0.093,0.212,0.242,0.656,0.242,1.042v15.171c0,0.388,0.314,0.701,0.702,0.701c0.386,0,0.699-0.313,0.699-0.701V10.143c0-0.386,0.149-0.829,0.244-1.042c0.055-0.125,0.086-0.263,0.086-0.408C10.604,8.125,10.144,7.664,9.577,7.664z"/>
</g>
</svg>
`);