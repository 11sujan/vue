<template>
    <div>
        <div class="content">
			<div class="container-fluid">
				<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
				<div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
					<p class="_title0">Category <Button @click="addModal=true"><Icon type="md-add" /> Add Category</Button</p>

					<div class="_overflow _table_div">
						<table class="_table">
								<!-- TABLE TITLE -->
							<tr>
								<th>ID</th>
								<th>Category Name</th>
								<th>Created At</th>
								<th>Action</th>
							</tr>
								<!-- TABLE TITLE -->

								<!-- ITEMS -->
							<tr v-for="(category, i) in categories" :key="i" v-if="categories.length">
								<td>{{i+1}}</td>
								<td class="_table_name">{{category.categoryName}}</td>
								<td class="_table_image"><img :src="category.iconImage" alt=""/></td>
								<td>
									<Button type="info" size="small" @click="showEditModal(category, i)">Edit</Button>
									<Button type="error" size="small" @click="showDeletingModal(category, i)" :loading="category.isDeleting">Delete</Button>
								</td>
							</tr>
								<!-- ITEMS -->
						</table>
					</div>
				</div>
				<!-- tag adding model -->
				<Modal
					v-model="addModal"
					title="Add Category"
					:mask-closable="false"
					:closable="false">
					<Input class="mb-2" v-model="data.categoryName" placeholder="Enter Category Name" />
                     <Upload type="drag" action="app/upload"
                        ref="uploads"
                        :headers="{'x-csrf-token' : token, 'X-Requested-With' : 'XMLHttpRequest'}"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                    >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload>

                    <div class="image_thumb" v-if="data.iconImage">
						<img :src ="`${data.iconImage}`">
						<div class="demo-upload-list-cover">
							<Icon type ="ios-trash-outline" @click="deleteImage"></Icon>
						</div>
                    </div>

					<div slot = "footer">
					<Button type="default" @click="addModal=false">Close</Button>
					<Button type="primary" @click="addCategory" :disabled="isAdding" :loading="isAdding">{{isAdding ? 'Adding..': 'Add Category'}}</Button>
					</div>
				</Modal>

					<!-- tag editing model -->

                    <Modal
					v-model="editModal"
					title="Edit Category"
					:mask-closable="false"
					:closable="false">
                    <Input class="mb-2" v-model="editData.categoryName" placeholder="Edit Category Name" />

                     <Upload v-show="isIconImageNew"
 					 type="drag" action="app/upload"
                        ref="editDataUploads"
                        :headers="{'x-csrf-token' : token, 'X-Requested-With' : 'XMLHttpRequest'}"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                    >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload>

                    <div class="image_thumb" v-if="editData.iconImage">
						<img :src ="`${editData.iconImage}`">
						<div class="demo-upload-list-cover">
							<Icon type ="ios-trash-outline" @click="deleteImage(false)"></Icon>
						</div>
                    </div>

					<div slot = "footer">
					<Button type="default" @click="closeEditModal">Close</Button>
                    <Button type="primary" @click="editCategory" :disabled="isAdding" :loading="isAdding">{{isAdding ? 'Editing..': 'Edit Category'}}</Button>

					</div>
				</Modal>

				<!-- deleting confirmation -->
				<!-- <Modal v-model="showDeleteModal" width="360">
					<p slot="header" style="color:#f60;text-align:center">
						<Icon type="ios-information-circle"></Icon>
						<span>Delete confirmation</span>
					</p>
					<div style="text-align:center">
						<p>Are you sure you want to delete tag?</p>
					</div>
					<div slot="footer">
						<Button type="error" size="large" long :loading="isDeleting" :disabled="isDeleting" @click="deleteTag" >Delete</Button>
					</div>
				</Modal> -->
                <deleteModal></deleteModal>

			</div>
		</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import deleteModal from "../components/deleteModal.vue"
export default {
  data() {
    return {
      data: {
        iconImage: "",
        categoryName: "",
      },
      addModal: false,
      editModal: false,
      isAdding: false,
      categories: [],
      editData: {
        categoryName: "",
        iconImage:''
      },
      index: -1,
      showDeleteModal: false,
      isDeleting: false,
      deleteItem: {},
      deletingIndex: -1,
      token: "",
      isIconImageNew: false,
	  isEditingItem: false
    };
  },

  methods: {
    async addCategory() {
      if (this.data.categoryName.trim() == "")
        return this.error("Categry Name is Required");
      if (this.data.iconImage.trim() == "")
        return this.error("Icone Image is Required");
      this.data.iconImage = `${this.data.iconImage}`;
      const res = await this.callApi("post", "app/create_category", this.data);
      if (res.status === 201) {
        this.categories.unshift(res.data);
        this.success("Category has been added Successfully!");
        this.addModal = false;
        this.data.categoryName = "";
        this.data.iconImage = "";
      } else {
        if (res.status == 422) {
          if (res.data.errors.categoryName) {
            this.error(res.data.errors.categoryName[0]);
          }
          if (res.data.errors.iconImage) {
            this.error(res.data.errors.iconImage[0]);
          }
        } else {
          this.swr();
        }
      }
    },
    async editCategory() {
      if (this.editData.categoryName.trim() == "")
        return this.error("Tag Name is Required");
      if(this.editData.iconImage.trim()=='') return this.error('Icon Image is Required')
      const res = await this.callApi(
        "post",
        "app/edit_category",
        this.editData
      );
      if (res.status === 200) {
        this.categories[this.index].categoryName = this.editData.categoryName;
        this.categories[this.index].iconImage = this.editData.iconImage
        this.success("Category has been edited Successfully!");
        this.editModal = false;
      } else {
        if (res.status == 422) {
          if (res.data.errors.categoryName) {
            this.error(res.data.errors.categoryName[0]);
          }
          if (res.data.errors.iconImage) {
            this.error(res.data.errors.iconImage[0]);
          }
        } else {
          this.swr();
        }
      }
    },
    showEditModal(category, index) {
      // let obj = {
      // 	id : category.id,
      // 	categoryName : category.categoryName,
      // 	iconImage : category.iconImage
      // }
      this.editData = category;
      this.editModal = true;
      this.index = index;
	  this.isEditingItem = true;
    },
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

    showDeletingModal(category, i) {
        const deleteModalObj = {
            showDeleteModal: true,
            deleteUrl : 'app/delete_category',
            data : category,
            deletingIndex: i,
            isDeleted : false

        }
            this.$store.commit('setDeletingModalObj', deleteModalObj)
//   this.deleteItem = category;
    //   this.deletingIndex = i;
    //   this.showDeleteModal = true;
    },
    handleSuccess(res, file) {
		res=`/uploads/${res}`
		if(this.isEditingItem){
			return this.editData.iconImage =res
		}
      this.data.iconImage = res;
    },
    handleError(res, file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc: `${
          file.errors.file.length
            ? file.errors.file[0]
            : "Something went wrong!"
        }`,
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png.",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },
    async deleteImage(isAdd = false) {
      if (!isAdd) { //for editing
        this.isIconImageNew = true;
        let image = this.editData.iconImage;
        this.editData.iconImage = "";
        this.$refs.editDataUploads.clearFiles();
      } else {
        console.log(this.data.iconImage);
        let image = this.data.iconImage;
        this.data.iconImage = "";
        this.$refs.uploads.clearFiles();
      }
      const res = await this.callApi("post", "app/delete_image", {
        imageName: this.image,
      });
      if (res.status != 200) {
        this.data.iconImage = image;
        this.swr();
      }
    },
	closeEditModal(){
	    this.isEditingItem = false;
        this.editModal = false;

	}
  },
  async created() {
    this.token = window.Laravel.csrfToken;
    const res = await this.callApi("get", "app/get_category");
    if (res.status == 200) {
      this.categories = res.data;
    } else {
      this.swr();
    }
  },
  components : {
      deleteModal
  },
  computed: {
    ...mapGetters(["getDeleteModalObj"])

  },
  watch: {
      getDeleteModalObj(obj){
          if(obj.isDeleted){
              this.categories.splice(obj.deletingIndex,1)
          }
      }
  }
};
</script>
