import { z } from "zod";

const RelationsSchema = z
  .object({
    characters: z
      .array(
        z.object({
          name: z.string().describe("The name of the character"),
          alignment: z
            .enum(["good", "evil"])
            .describe("Whether the character is good or evil"),
        })
      )
      .describe("The main characters in the movies"),
    relationships: z
      .array(
        z.object({
          from: z
            .string()
            .describe("The character who is related to the other character"),
          to: z
            .string()
            .describe("The character who is related to the other character"),
          type: z
            .string()
            .describe("The type of relationship between the characters"),
        })
      )
      .describe("The relationships between characters"),
  })
  .describe(
    "A schema representing a graph of the relationships between characters in a movie"
  );

export default RelationsSchema;

export const config = {
  path: "relations",
  public: true,
  cache: "Individual",
  contentType: "text",
  name: "relations",
  description: "A schema that describes relationships between characters",
  model: "gpt-4o-mini",
};
