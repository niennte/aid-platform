// @flow

import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';

type Props = {
  isOpen: boolean,
  toggle: Function,
  className: ?string,
  children: ?any,
}

export default ({
  isOpen, toggle, className, children,
}: Props) => (
  <div>
    <Modal isOpen={isOpen} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle} />
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  </div>
);
