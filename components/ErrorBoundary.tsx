import React, { Component, ReactNode } from 'react';
import { Button, Modal, Text } from '@mantine/core';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Modal opened={true} onClose={() => this.setState({ hasError: false })}>
          <Text>Something went wrong:</Text>
          <Text>{this.state.errorMessage}</Text>
          <Button onClick={() => this.setState({ hasError: false })}>Close</Button>
        </Modal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
