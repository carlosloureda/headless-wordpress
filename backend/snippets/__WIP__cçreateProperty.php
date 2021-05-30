
<?php
// ADVANCED STAFF (WIP) - From Kellen
/* Add a new input field to the mutation (createIncome / updateIncome)
When an income post is being created/updated, get the value passed in for that input field, sanitize it, and save it to the database using ACF’s update_field() or WP’s update_post_meta() — either will work.
(edited)*/




namespace LouCoding\WPGraphQL\Mutation;

use WP_Post_Type;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use HwpRockers\Interfaces\Hookable;
use HwpRockers\PostTypes\ProjectPostType;

class CreateProperty implements Hookable {
    // use UpsertProject;

    public function register_hooks(): void {
        add_action( 'graphql_register_types',                              [ $this, 'register_input_fields'] );
        // add_action( 'graphql_before_resolve_field',                        [ $this, 'validate' ], 10, 7 );
        add_action( 'graphql_post_object_mutation_update_additional_data', [ $this, 'save_additional_data' ], 10, 4 );
    }

    public function register_input_fields(): void  {
        // $input_type = 'Create' . ProjectPostType::GRAPHQL_SINGLE_NAME . 'Input';
        $input_type = 'Create' . 'Property' . 'Input';

        register_graphql_fields( $input_type, [
            'propertyFields' => [
                'type'        => [ 'non_null' => 'String' ],
                'description' => __( 'Project number', 'hwp-rockers' ),
            ]
        ]);
    }

    add_filter( 'register_post_type_args', function( $args, $post_type ) {

        // Change this to the post type you are adding support for
        if ( 'property' === $post_type ) {



          register_graphql_fields( $input_type, [
            'projectNumber' => [
                'type'        => [ 'non_null' => 'String' ],
                'description' => __( 'Project number', 'hwp-rockers' ),
            ]
        ]);
        }
      
        return $args;
      
      }, 10, 2 );

       /**
     * @param mixed           $source         Source passed down the Resolve Tree.
     * @param array           $args           Args for the field.
     * @param AppContext      $context        AppContext passed down the ResolveTree.
     * @param ResolveInfo     $info           ResolveInfo passed down the ResolveTree.
     * @param mixed           $field_resolver Field resolver.
     * @param string          $type_name      Name of the type the fields belong to.
     * @param string          $field_key      Name of the field.
     * @param FieldDefinition $field          Field Definition for the resolving field.
     */
    public function validate( $source, array $args, AppContext $context, ResolveInfo $info, $field_resolver, string $type_name, string $field_key ): void {
        if ( 'RootMutation' !== $type_name || ! $this->is_create_project_mutation( $field_key ) ) {
            return;
        }

        $this->validate_project_number( $args['input']['projectNumber'] );
    }

    public function save_additional_data( int $post_id, array $input, WP_Post_Type $post_type_object, string $mutation_name ): void {
        if ( ! $this->is_create_project_mutation( $mutation_name ) ) {
            return;
        }

        $this->save_additional_upsert_data( $post_id, $input );
    }

    private function is_create_project_mutation( string $mutation_name ): bool {
        return 'create' . ProjectPostType::GRAPHQL_SINGLE_NAME === $mutation_name;
    }
}

/** PARA LOS SNIPPETS */

// Create property Field
add_action( 'graphql_register_types',   'register_input_fields' );

add_action( 'graphql_register_types', function() {
    register_graphql_fields( 'propertyFields', [
        'description' => [
            'type'        => [ 'non_null' => 'String' ],
            'description' => 'Description of the property' 
            'resolve' => function( $root, $args, $context, $info ) {
              return 'Field one value...';
            }
        ]
    ]);
  });

function register_input_fields(): void  {

    $description_subfield = 'description'

    register_graphql_fields( $description_subfield, [
      'description' => [
          'type'        => [ 'non_null' => 'String' ],
          'description' => 'Description of the property' 
      ]
    ]);

    $input_type = 'CreatePropertyInput';
    register_graphql_fields( $input_type, [
        'propertyFields' => [
            'type'        => [ 'non_null' => 'Property_Propertyfields' ],
            'description' => 'Extended data for property'
        ]
    ]);
}

// Save the data !
add_action( 'graphql_post_object_mutation_update_additional_data', 'save_additional_data' );



public function save_additional_data( int $post_id, array $input, WP_Post_Type $post_type_object, string $mutation_name ): void {
    if ( ! $this->is_create_project_mutation( $mutation_name ) ) {
        return;
    }

    $this->save_additional_upsert_data( $post_id, $input );
}

private function save_additional_upsert_data( int $post_id, array $input ): void {
    $project_number_sanitized = sanitize_text_field( $input['projectNumber'] );

    update_post_meta( $post_id, 'project_number', $project_number_sanitized );
}

////////////////////////////////////////////
// Create property Field
add_action( 'graphql_register_types',   'register_input_fields' );

// step 1: register "custom field ?"
function register_input_fields(): void  {

    

      $input_type = 'CreatePropertyInput';
      register_graphql_fields( $input_type, [
          'description' => [
              'type'        => [ 'non_null' => 'String' ],
              'description' => 'Extended data for property' 
          ]
      ]);
}

add_action( 'graphql_post_object_mutation_update_additional_data', [ $this, 'save_additional_data' ], 10, 4 );


// Create property Field
add_action( 'graphql_register_types',   'register_input_fields' );

function register_input_fields(): void  {
      $input_type = 'CreatePropertyInput';
      register_graphql_fields( $input_type, [
          'propertyFields' => [
              'type'        => [ 'non_null' => 'Propertyfields' ],
              'description' => 'Extended data for property'
          ]
      ]);
}

add_action( 'graphql_register_types', function() { 

    register_graphql_object_type( 'Propertyfields', [
      'description' => __( 'The field group for property details', 'replace-me' ),
      'fields' => [
        'description' => [
          'type' => 'String', 
          'description' => __( 'Description of the property', 'replace-me' ),
        ],
      ],
    ] );
  
} 
);

// DOMIGNO 30 De Mayor

add_action( 'graphql_register_types', function() {

    // Create the "Propertyfields "input"
	register_graphql_input_type( 'Propertyfields', [
		'description' => __( 'Describe what Propertyfields is', 'replace-me' ),
		'fields' => [
			'testField' => [
				'type' => 'String',
				'description' => __( 'Describe what testField should be used for', 'replace-me' ),
			],
			'count' => [
				'type' => 'Int',
				'description' => __( 'Describe what the count field should be used for', 'replace-me' ),
			],
		],
	]);

    // Create the property input
	register_graphql_fields( 'CreatePropertyInput', [
          'propertyFields' => [
              'type'        => [ 'non_null' => 'Propertyfields' ],
              'description' => 'Extended data for property'
          ]
      ]);
});


add_action( 'graphql_post_object_mutation_update_additional_data', 'save_additional_data' );



public function save_additional_data( int $post_id, array $input, WP_Post_Type $post_type_object, string $mutation_name ): void {
    if ( ! $this->is_create_project_mutation( $mutation_name ) ) {
        return;
    }

    $this->save_additional_upsert_data( $post_id, $input );
}

private function save_additional_upsert_data( int $post_id, array $input ): void {
    $project_number_sanitized = sanitize_text_field( $input['projectNumber'] );

    update_post_meta( $post_id, 'project_number', $project_number_sanitized );
}





