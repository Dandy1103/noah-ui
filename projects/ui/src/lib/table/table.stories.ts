import type { Meta, StoryObj } from '@storybook/angular';
import { NoahTableComponent } from './table.component';

const meta: Meta<NoahTableComponent> = {
  title: '表格',
  component: NoahTableComponent,
  render: () => ({
    template: `
      <noah-table>
        <table>
          <thead>
            <tr><th>員工編號</th><th>姓名</th><th>部門</th></tr>
          </thead>
          <tbody>
            <tr><td>E00001</td><td>鄭丞恩</td><td>人資部</td></tr>
            <tr><td>E00013</td><td>謝宜臻</td><td>資訊部</td></tr>
          </tbody>
        </table>
      </noah-table>
    `,
  }),
};

export default meta;
type Story = StoryObj<NoahTableComponent>;

export const 員工清單: Story = {};
