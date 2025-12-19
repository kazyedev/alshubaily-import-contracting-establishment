CREATE TABLE "account_roles" (
	"account_id" text NOT NULL,
	"role_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "account_roles_account_id_role_id_pk" PRIMARY KEY("account_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"auth_user_id" text NOT NULL,
	"display_name_en" text,
	"display_name_ar" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_auth_user_id_unique" UNIQUE("auth_user_id")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" text PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"key" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "permissions_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" text NOT NULL,
	"permission_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" text PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "article_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"image_id" text,
	"description_en" text,
	"description_ar" text,
	"slug_en" text NOT NULL,
	"slug_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "article_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "article_categories_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "article_images" (
	"article_id" text NOT NULL,
	"image_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "article_images_article_id_image_id_pk" PRIMARY KEY("article_id","image_id")
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"main_image_id" text,
	"rich_content_id" text,
	"author_id" text,
	"published_at" timestamp,
	"slug_en" text NOT NULL,
	"slug_ar" text NOT NULL,
	"category_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "articles_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "articles_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"id" text PRIMARY KEY NOT NULL,
	"public_name_en" text NOT NULL,
	"public_name_ar" text NOT NULL,
	"account_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" text PRIMARY KEY NOT NULL,
	"question_en" text NOT NULL,
	"question_ar" text NOT NULL,
	"answer_en" text NOT NULL,
	"answer_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "why_choose_us" (
	"id" text PRIMARY KEY NOT NULL,
	"reason_en" text NOT NULL,
	"reason_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"title_en" text,
	"title_ar" text,
	"alt_en" text,
	"alt_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rich_contents" (
	"id" text PRIMARY KEY NOT NULL,
	"content_en" text,
	"content_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_images" (
	"project_id" text NOT NULL,
	"image_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_images_project_id_image_id_pk" PRIMARY KEY("project_id","image_id")
);
--> statement-breakpoint
CREATE TABLE "project_statuses" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_types" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"image_id" text,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"main_image_id" text,
	"description_en" text,
	"description_ar" text,
	"location_en" text,
	"location_ar" text,
	"year" integer,
	"project_type_id" text,
	"project_status_id" text,
	"slug_en" text NOT NULL,
	"slug_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "projects_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" text PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"logo_image_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" text PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"logo_image_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_details" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"property_id" text NOT NULL,
	"value_en" text,
	"value_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"product_id" text NOT NULL,
	"image_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_images_product_id_image_id_pk" PRIMARY KEY("product_id","image_id")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"main_image_id" text,
	"description_en" text,
	"description_ar" text,
	"category_id" text,
	"slug_en" text NOT NULL,
	"slug_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "products_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"category_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "beneficiary_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contracting_service_excluded_works" (
	"contracting_service_id" text NOT NULL,
	"work_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_service_excluded_works_contracting_service_id_work_id_pk" PRIMARY KEY("contracting_service_id","work_id")
);
--> statement-breakpoint
CREATE TABLE "contracting_service_faqs" (
	"contracting_service_id" text NOT NULL,
	"faq_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_service_faqs_contracting_service_id_faq_id_pk" PRIMARY KEY("contracting_service_id","faq_id")
);
--> statement-breakpoint
CREATE TABLE "contracting_service_included_works" (
	"contracting_service_id" text NOT NULL,
	"work_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_service_included_works_contracting_service_id_work_id_pk" PRIMARY KEY("contracting_service_id","work_id")
);
--> statement-breakpoint
CREATE TABLE "contracting_service_materials" (
	"contracting_service_id" text NOT NULL,
	"material_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_service_materials_contracting_service_id_material_id_pk" PRIMARY KEY("contracting_service_id","material_id")
);
--> statement-breakpoint
CREATE TABLE "contracting_service_projects" (
	"contracting_service_id" text NOT NULL,
	"project_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_service_projects_contracting_service_id_project_id_pk" PRIMARY KEY("contracting_service_id","project_id")
);
--> statement-breakpoint
CREATE TABLE "contracting_service_quality_safety" (
	"contracting_service_id" text NOT NULL,
	"quality_safety_standard_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_service_quality_safety_contracting_service_id_quality_safety_standard_id_pk" PRIMARY KEY("contracting_service_id","quality_safety_standard_id")
);
--> statement-breakpoint
CREATE TABLE "contracting_service_techniques" (
	"contracting_service_id" text NOT NULL,
	"technique_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_service_techniques_contracting_service_id_technique_id_pk" PRIMARY KEY("contracting_service_id","technique_id")
);
--> statement-breakpoint
CREATE TABLE "contracting_service_why_choose_us" (
	"contracting_service_id" text NOT NULL,
	"why_choose_us_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_service_why_choose_us_contracting_service_id_why_choose_us_id_pk" PRIMARY KEY("contracting_service_id","why_choose_us_id")
);
--> statement-breakpoint
CREATE TABLE "contracting_services" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"main_service_id" text,
	"main_image_id" text,
	"target_audience_en" text,
	"target_audience_ar" text,
	"when_needed_en" text,
	"when_needed_ar" text,
	"slug_en" text NOT NULL,
	"slug_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracting_services_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "contracting_services_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" text PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "delivery_methods" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "import_methods" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "import_service_beneficiaries" (
	"import_service_id" text NOT NULL,
	"beneficiary_category_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_beneficiaries_import_service_id_beneficiary_category_id_pk" PRIMARY KEY("import_service_id","beneficiary_category_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_countries" (
	"import_service_id" text NOT NULL,
	"country_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_countries_import_service_id_country_id_pk" PRIMARY KEY("import_service_id","country_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_delivery_methods" (
	"import_service_id" text NOT NULL,
	"delivery_method_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_delivery_methods_import_service_id_delivery_method_id_pk" PRIMARY KEY("import_service_id","delivery_method_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_faqs" (
	"import_service_id" text NOT NULL,
	"faq_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_faqs_import_service_id_faq_id_pk" PRIMARY KEY("import_service_id","faq_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_import_methods" (
	"import_service_id" text NOT NULL,
	"import_method_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_import_methods_import_service_id_import_method_id_pk" PRIMARY KEY("import_service_id","import_method_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_quality_warranty" (
	"import_service_id" text NOT NULL,
	"quality_warranty_standard_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_quality_warranty_import_service_id_quality_warranty_standard_id_pk" PRIMARY KEY("import_service_id","quality_warranty_standard_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_shipments" (
	"import_service_id" text NOT NULL,
	"shipment_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_shipments_import_service_id_shipment_id_pk" PRIMARY KEY("import_service_id","shipment_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_suppliers" (
	"import_service_id" text NOT NULL,
	"supplier_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_suppliers_import_service_id_supplier_id_pk" PRIMARY KEY("import_service_id","supplier_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_usages" (
	"import_service_id" text NOT NULL,
	"usage_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_usages_import_service_id_usage_id_pk" PRIMARY KEY("import_service_id","usage_id")
);
--> statement-breakpoint
CREATE TABLE "import_service_why_choose_us" (
	"import_service_id" text NOT NULL,
	"why_choose_us_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_service_why_choose_us_import_service_id_why_choose_us_id_pk" PRIMARY KEY("import_service_id","why_choose_us_id")
);
--> statement-breakpoint
CREATE TABLE "import_services" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"main_service_id" text,
	"main_image_id" text,
	"slug_en" text NOT NULL,
	"slug_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "import_services_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "import_services_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "main_services" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"main_image_id" text,
	"slug_en" text NOT NULL,
	"slug_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "main_services_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "main_services_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "materials" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quality_safety_standards" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quality_warranty_standards" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shipment_images" (
	"shipment_id" text NOT NULL,
	"image_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shipment_images_shipment_id_image_id_pk" PRIMARY KEY("shipment_id","image_id")
);
--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"main_image_id" text,
	"description_en" text,
	"description_ar" text,
	"arrival_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "techniques" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usages" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "works" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account_roles" ADD CONSTRAINT "account_roles_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_roles" ADD CONSTRAINT "account_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_categories" ADD CONSTRAINT "article_categories_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_images" ADD CONSTRAINT "article_images_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_images" ADD CONSTRAINT "article_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_main_image_id_images_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_rich_content_id_rich_contents_id_fk" FOREIGN KEY ("rich_content_id") REFERENCES "public"."rich_contents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_article_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."article_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authors" ADD CONSTRAINT "authors_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_types" ADD CONSTRAINT "project_types_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_main_image_id_images_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_project_type_id_project_types_id_fk" FOREIGN KEY ("project_type_id") REFERENCES "public"."project_types"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_project_status_id_project_statuses_id_fk" FOREIGN KEY ("project_status_id") REFERENCES "public"."project_statuses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_image_id_images_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_logo_image_id_images_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_main_image_id_images_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_category_id_property_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."property_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_excluded_works" ADD CONSTRAINT "contracting_service_excluded_works_contracting_service_id_contracting_services_id_fk" FOREIGN KEY ("contracting_service_id") REFERENCES "public"."contracting_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_excluded_works" ADD CONSTRAINT "contracting_service_excluded_works_work_id_works_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_faqs" ADD CONSTRAINT "contracting_service_faqs_contracting_service_id_contracting_services_id_fk" FOREIGN KEY ("contracting_service_id") REFERENCES "public"."contracting_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_faqs" ADD CONSTRAINT "contracting_service_faqs_faq_id_faqs_id_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_included_works" ADD CONSTRAINT "contracting_service_included_works_contracting_service_id_contracting_services_id_fk" FOREIGN KEY ("contracting_service_id") REFERENCES "public"."contracting_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_included_works" ADD CONSTRAINT "contracting_service_included_works_work_id_works_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_materials" ADD CONSTRAINT "contracting_service_materials_contracting_service_id_contracting_services_id_fk" FOREIGN KEY ("contracting_service_id") REFERENCES "public"."contracting_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_materials" ADD CONSTRAINT "contracting_service_materials_material_id_materials_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_projects" ADD CONSTRAINT "contracting_service_projects_contracting_service_id_contracting_services_id_fk" FOREIGN KEY ("contracting_service_id") REFERENCES "public"."contracting_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_projects" ADD CONSTRAINT "contracting_service_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_quality_safety" ADD CONSTRAINT "contracting_service_quality_safety_contracting_service_id_contracting_services_id_fk" FOREIGN KEY ("contracting_service_id") REFERENCES "public"."contracting_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_quality_safety" ADD CONSTRAINT "contracting_service_quality_safety_quality_safety_standard_id_quality_safety_standards_id_fk" FOREIGN KEY ("quality_safety_standard_id") REFERENCES "public"."quality_safety_standards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_techniques" ADD CONSTRAINT "contracting_service_techniques_contracting_service_id_contracting_services_id_fk" FOREIGN KEY ("contracting_service_id") REFERENCES "public"."contracting_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_techniques" ADD CONSTRAINT "contracting_service_techniques_technique_id_techniques_id_fk" FOREIGN KEY ("technique_id") REFERENCES "public"."techniques"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_why_choose_us" ADD CONSTRAINT "contracting_service_why_choose_us_contracting_service_id_contracting_services_id_fk" FOREIGN KEY ("contracting_service_id") REFERENCES "public"."contracting_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_service_why_choose_us" ADD CONSTRAINT "contracting_service_why_choose_us_why_choose_us_id_why_choose_us_id_fk" FOREIGN KEY ("why_choose_us_id") REFERENCES "public"."why_choose_us"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_services" ADD CONSTRAINT "contracting_services_main_service_id_main_services_id_fk" FOREIGN KEY ("main_service_id") REFERENCES "public"."main_services"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracting_services" ADD CONSTRAINT "contracting_services_main_image_id_images_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_beneficiaries" ADD CONSTRAINT "import_service_beneficiaries_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_beneficiaries" ADD CONSTRAINT "import_service_beneficiaries_beneficiary_category_id_beneficiary_categories_id_fk" FOREIGN KEY ("beneficiary_category_id") REFERENCES "public"."beneficiary_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_countries" ADD CONSTRAINT "import_service_countries_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_countries" ADD CONSTRAINT "import_service_countries_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_delivery_methods" ADD CONSTRAINT "import_service_delivery_methods_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_delivery_methods" ADD CONSTRAINT "import_service_delivery_methods_delivery_method_id_delivery_methods_id_fk" FOREIGN KEY ("delivery_method_id") REFERENCES "public"."delivery_methods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_faqs" ADD CONSTRAINT "import_service_faqs_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_faqs" ADD CONSTRAINT "import_service_faqs_faq_id_faqs_id_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_import_methods" ADD CONSTRAINT "import_service_import_methods_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_import_methods" ADD CONSTRAINT "import_service_import_methods_import_method_id_import_methods_id_fk" FOREIGN KEY ("import_method_id") REFERENCES "public"."import_methods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_quality_warranty" ADD CONSTRAINT "import_service_quality_warranty_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_quality_warranty" ADD CONSTRAINT "import_service_quality_warranty_quality_warranty_standard_id_quality_warranty_standards_id_fk" FOREIGN KEY ("quality_warranty_standard_id") REFERENCES "public"."quality_warranty_standards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_shipments" ADD CONSTRAINT "import_service_shipments_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_shipments" ADD CONSTRAINT "import_service_shipments_shipment_id_shipments_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_suppliers" ADD CONSTRAINT "import_service_suppliers_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_suppliers" ADD CONSTRAINT "import_service_suppliers_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_usages" ADD CONSTRAINT "import_service_usages_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_usages" ADD CONSTRAINT "import_service_usages_usage_id_usages_id_fk" FOREIGN KEY ("usage_id") REFERENCES "public"."usages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_why_choose_us" ADD CONSTRAINT "import_service_why_choose_us_import_service_id_import_services_id_fk" FOREIGN KEY ("import_service_id") REFERENCES "public"."import_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_service_why_choose_us" ADD CONSTRAINT "import_service_why_choose_us_why_choose_us_id_why_choose_us_id_fk" FOREIGN KEY ("why_choose_us_id") REFERENCES "public"."why_choose_us"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_services" ADD CONSTRAINT "import_services_main_service_id_main_services_id_fk" FOREIGN KEY ("main_service_id") REFERENCES "public"."main_services"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_services" ADD CONSTRAINT "import_services_main_image_id_images_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "main_services" ADD CONSTRAINT "main_services_main_image_id_images_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_images" ADD CONSTRAINT "shipment_images_shipment_id_shipments_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_images" ADD CONSTRAINT "shipment_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_main_image_id_images_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;