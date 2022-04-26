import React, { Component, PropsWithChildren, ReactNode } from 'react';

interface IState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<PropsWithChildren<ReactNode>, IState> {
  constructor(props: PropsWithChildren<ReactNode>) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return <div> Произошла ошибка. Перезагрузите страницу.</div>;
    }

    return this.props.children;
  }
}
