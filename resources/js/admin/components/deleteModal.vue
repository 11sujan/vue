<template>
  <div>
    <!-- deleting confirmation -->
    <Modal
      :value="getDeleteModalObj.showDeleteModal"
      :mask-closable="false"
      :closable="false"
      width="360"
    >
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
      //   this.isDeleting = true;
        const res = await this.callApi(
          "post",
          this.getDeleteModalObj.deleteUrl,this.getDeleteModalObj.data
        );
        if (res.status === 200) {
          this.success("Category has been deleted sucessfully!");
          this.$store.commit('setDeleteModal', true)
        } else {
            this.swr();
          this.$store.commit('setDeleteModal', false)
        }
        this.isDeleting = false;
    },
  },
  computed: {
    ...mapGetters(["getDeleteModalObj"]),
  },
};
</script>
