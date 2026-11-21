import { applicationConfig, type Preview } from '@storybook/angular';
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { provideAnimations } from '@angular/platform-browser/animations';
import docJson from "../documentation.json";
setCompodocJson(docJson);

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;