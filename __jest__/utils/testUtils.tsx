import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import type { RootState } from '../../src/core/redux/store';
// As a basic setup, import your same slice reducers
import reducer from '../../src/core/redux/slices/storeSlice';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
   preloadedState?: Partial<RootState>;
   store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
   ui: React.ReactElement,
   {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = configureStore({
         reducer: {
            store: reducer,
         },
         preloadedState,
      }),
      ...renderOptions
   }: ExtendedRenderOptions = {},
) {
   function Wrapper({ children }: PropsWithChildren<object>): React.JSX.Element {
      return <Provider store={store}>{children}</Provider>;
   }

   // Return an object with the store and all of RTL's query functions
   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
