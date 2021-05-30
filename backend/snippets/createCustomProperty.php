<?
add_action('graphql_register_types', function(){
    register_graphql_mutation('createCustomProperty', [
        'inputFields' => [
            'title' => [
                'type' => 'String',
                'description' => 'The title of the "post"'
            ],
            'description' => [
                'type' => 'String',
                'description' => 'content field'
            ],
            'galleryInput' => [
                'type' => ['list_of' => 'ID'],
                'description' => 'gallery field'
            ],

        ],
        'outputFields' => [
            'propertySubmitted' => [
                'type' => 'Boolean',
                'description' =>'Property submission successfull or not',
            ],
			'property' => [
				'type' => 'Property',
				'description' => 'The property created'
			],
			'description' => [
				'type' => 'String',
				'description' => 'The description created'
			]
        ],
        'mutateAndGetPayload' => function($input, $context, $info){
			$title = uniqid('property-', false);
			if (isset($input['title'])) {
				$title = $input['title'];
			}
            $post_id = wp_insert_post([
                'post_type'=> 'property',
                'post_title' => $title,
                'post_content' => sanitize_text_field($input['description']),
                'post_status' => 'draft' // 'publish' , 'future'
            ]);
            update_field('description', $input['description'], $post_id);
						
			// $post = get_post($post_id);
			// error_log("Hi". $post->id);
			return [
				'propertySubmitted' => true,
				'property' => [
					'id' => $post_id,
					'title' => $title		
				],
				'description' => $input['description']	
			];
        }
    ]);
});