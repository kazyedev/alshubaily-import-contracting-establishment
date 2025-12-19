import * as authSchema from "./auth-schema";
import * as imagesSchema from "./images-schema";
import * as richContentSchema from "./rich-content-schema";
import * as projectsSchema from "./projects-schema";
import * as partnersSchema from "./partners-schema";
import * as blogSchema from "./blog-schema";
import * as productsSchema from "./products-schema";
import * as servicesSchema from "./services-schema";
import * as commonSchema from "./common-schema";

export const schema = {
    ...authSchema,
    ...imagesSchema,
    ...richContentSchema,
    ...projectsSchema,
    ...partnersSchema,
    ...blogSchema,
    ...productsSchema,
    ...servicesSchema,
    ...commonSchema,
};

// Re-export all schemas for direct imports
export * from "./auth-schema";
export * from "./images-schema";
export * from "./rich-content-schema";
export * from "./projects-schema";
export * from "./partners-schema";
export * from "./blog-schema";
export * from "./products-schema";
export * from "./services-schema";
export * from "./common-schema";