import {
  Marker,
} from 'google-maps-react';

/*
Hatchet fix for a bug in the imported module:
The only way to prevent markers from rerendeering
whenever ANYTHING at all changes ANYWHERE.
Based on fix
 https://github.com/fullstackreact/google-maps-react/issues/269#issuecomment-432919186
 with thanks to Quiso
 */
class NonJerkingMarker extends Marker {
  componentDidUpdate() {
    if (this.props.shouldRender) {
      this.marker.setMap(null);
      this.renderMarker();
    }
  }
}

export default NonJerkingMarker;
