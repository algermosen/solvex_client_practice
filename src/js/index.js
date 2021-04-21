import itemService from './modules/ItemService.js';

new Vue({
  el: '#app',
  data: {
    id: 0,
    itemName: '',
    itemDescription: '',
    items: []
  },
  computed: {
    itemsCount: function () {
      return this.items.length;
    },
    hasItems: function () {
      return this.items.length > 0;
    },
    readyToUpdate: function () {
      return this.id !== 0;
    }
  },
  mounted: async function () {
    await this.refreshItems();
  },
  methods: {
    refreshItems: async function () {
      this.items = await itemService.getAll();
    },
    deleteItem: async function (id) {
      await itemService.delete(id);
      await this.refreshItems();
    },
    updateItem: async function () {
      await itemService.update(this.id, {
        name: this.itemName,
        description: this.itemDescription
      });
      await this.refreshItems();
    },
    selectItem: async function (id) {
      const item = await itemService.getById(id);
      const { Id, Name, Description } = item;
      this.id = Id;
      this.itemName = Name;
      this.itemDescription = Description;
    },
    onFormSubmit: async function () {
      await itemService.create({
        name: this.itemName,
        description: this.itemDescription
      });
      await this.refreshItems();
      this.id = 0;
    },
    clear: function () {
      this.itemName = '';
      this.itemDescription = '';
    }
  }
});
