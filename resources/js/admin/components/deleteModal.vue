<template>
  <div>
    <!-- deleting confirmation -->
    <Modal :value="getDeleteModalObj.showDeleteModal" width="360">
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>Delete confirmation</span>
      </p>
      <div style="text-align: center">
        <p>Are you sure you want to delete tag?</p>
      </div>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          long
          :loading="isDeleting"
          :disabled="isDeleting"
          @click="deleteTag"
          >Delete</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isDeleting: false,
    };
  },
  methods: {
    async deleteTag() {
      this.isDeleting = true;
      const res = await this.callApi(
        "post",
        "app/delete_category",
        this.deleteItem
      );
      if (res.status === 200) {
        this.categories.splice(this.deletingIndex, 1);
        this.success("Category has been deleted sucessfully!");
      } else {
        this.swr();
      }
      this.isDeleting = false;
      this.showDeleteModal = false;
    },
  },
  computed: {
    ...mapGetters(["getDeleteModalObj"]),
  },
};
</script>
